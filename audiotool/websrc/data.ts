/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {authenticatedFetch, postAsJson, Spinner} from './util';
import {formatDateCode} from '../commonsrc/util';
import * as schema from '../commonsrc/schema';

// A DAO and server connection for the user's application state.
export class Data {
  listener: Listener;  // the app
  fbuser?: FBUser;  // set when the user is authenticated
  user?: schema.EUserInfo;  // set once the user has a server entry, post-consent
  consented: boolean = false;  // Set when the server thinks this user has all required agreements
  consentCheckTimestamp: number = 0;  // Last time we checked agreements
  hasMicrophonePermission: 'yes'|'no'|'maybe' = 'maybe';  // Maybe means we won't know until we request.

  // The user's currently assigned tasks, if any
  tasks: schema.EUserTaskInfo[] = [];
  tasksById = new Map<string, schema.EUserTaskInfo>();

  constructor(listener: Listener) {
    this.listener = listener;
    firebase.auth().onAuthStateChanged(async (user: FBUser) => await this.handleUserAuth(user));
  }

  // Called when Firebase gets a sign-in
  async handleUserAuth(fbuser: FBUser): Promise<void> {
    this.fbuser = fbuser;
    await this.checkPermissions();
    if (this.fbuser == null) {
      await this.listener.handleUpdate();

    } else {
      // Load whatever we know about the user and then update the UI
      const result = await postAsJson('/api/getuser', {});
      const [euser, etasks, isConsented] = result as [schema.EUserInfo, schema.EUserTaskInfo[], boolean];
      this.consented = isConsented;
      this.consentCheckTimestamp = Date.now();
      if (euser) {
        this.updateFields(euser, etasks);
      }

      // Poke the app to respond to state changes
      await this.listener.handleUpdate();
    }
  }

  // Fetches the list of applicable consents for this user; only the live version is included.
  async listConsents(language: string, tags: string[]): Promise<schema.EConsentInfo[]> {
    return await postAsJson('/api/listconsents', {language, tags}) as schema.EConsentInfo[];
  }

  // Fetches the HTML body of a consent
  async loadConsentText(consentId: string, version: number): Promise<string> {
    const rsp = await authenticatedFetch('/api/getconsenttext', {consentId, version}, 'get');
    return await rsp.text();
  }

  // Creates a new user account. The user must be signed in.
  async enroll(language: string, tags: string[], agreements: schema.EAgreementInfo[],
               demographics: schema.UserDemographics): Promise<void> {
    if (!this.fbuser) {
      throw new Error('Unexpected signup for unauthenticated user');
    }
    const result = await postAsJson('/api/signup', {language, tags, agreements, demographics});
    const [euser, etasks, isConsented] = result as [schema.EUserInfo, schema.EUserTaskInfo[], boolean];
    this.updateFields(euser, etasks);
    this.consented = isConsented;
    this.consentCheckTimestamp = Date.now();
    console.log(`created user: ${JSON.stringify(this.user)}`);
    await this.listener.handleUpdate();
  }

  // Adds the given agreements to the user's consent records
  async updateAgreements(agreements: schema.EAgreementInfo[]): Promise<void> {
    if (!this.fbuser || !this.user) {
      throw new Error('Unexpected agreement for unauthenticated/unenrolled user');
    }
    const result = await postAsJson('/api/updateagreements', {agreements});
    const [euser, isConsented] = result as [schema.EUserInfo, boolean];
    this.user = euser;
    this.consented = isConsented;
    this.consentCheckTimestamp = Date.now();
    await this.listener.handleUpdate();
  }

  // Saves the given audio/transcript pair to the server.
  async saveAudio(task: schema.EUserTaskInfo, audioData: ArrayBuffer, mimeType: string) {
    return await Spinner.waitFor(async () => {
      const now = new Date();
      const args = {
        task: JSON.stringify(task),
        localdate: formatDateCode(now),
        tzo: now.getTimezoneOffset(),
        mimeType
      };
      const rsp = await authenticatedFetch('/api/uploadaudio', args, 'post', audioData);
      const [euser, etask, erec] = await rsp.json() as [schema.EUserInfo, schema.EUserTaskInfo, schema.ERecordingMetadata];
      await this.updateTask(euser, etask);
      return erec;
    });
  }

  // Deletes a recording and updates the user.
  async deleteAudio(task: schema.EUserTaskInfo) {
    await Spinner.waitFor(async () => {
      const taskId = task.id;
      const rsp = await authenticatedFetch('/api/deleteaudio', {taskId}, 'post');
      const [euser, etask] = await rsp.json() as [schema.EUserInfo, schema.EUserTaskInfo];
      await this.updateTask(euser, etask);
    });
  }

  // Returns true if the user has a previously stored eligibilty marker, or if they have consented.
  loadEligibility(): boolean {
    if (this.user) {
      return true;  // they have a user so they must have already gotten past the signup flow
    }
    const d: string|null = localStorage.getItem('eligible');
    return !!d && d === 'yes';
  }

  // Stores the user's eligibility response so they can skip the signup form next time
  saveEligibility() {
    localStorage.setItem('eligible', 'yes');
  }

  // Stores demographics locally, for later submission when we enroll the person
  saveDemographics(d: schema.UserDemographics) {
    localStorage.setItem('demographics', JSON.stringify(d));
  }

  // Retrieves any previously stored demographics, or returns a new blank one.
  loadDemographics(): schema.UserDemographics {
    const d: string|null = localStorage.getItem('demographics');
    if (d) {
      return JSON.parse(d) as schema.UserDemographics;
    } else {
      return {};
    }
  }

  // Stores the user's microphone choice on this browser, or '' for default device.
  saveMicrophoneChoice(deviceId: string) {
    localStorage.setItem('microphone', deviceId);
  }

  // Returns the selected microphone, or '' if the default should be used.
  loadMicrophoneChoice(): string {
    const deviceId = localStorage.getItem('microphone');
    return deviceId ? deviceId : '';
  }

  // Returns true if all required fields in the demographics struct are complete.
  isCompletedDemographics(): boolean {
    let d: schema.UserDemographics;
    if (this.user && this.user.demographics) {
      d = this.user.demographics;
    } else {
      d = this.loadDemographics();
    }
    return (!!d.country &&
      (d.country !== 'USA' || !!d.state) &&
      (d.hasHelper != undefined) &&
      (!d.hasHelper || !!d.helperEmail) &&
      !!d.consentStorage &&
      !!d.consentInitials &&
      !!d.acceptTos);
  }

  // Acquires updated data from the server's responses
  private updateFields(user: schema.EUserInfo, tasks: schema.EUserTaskInfo[]) {
    this.user = user;
    this.tasks = tasks;
    this.tasksById.clear();
    for (const task of tasks) {
      this.tasksById.set(task.id, task);
    }
  }

  // Same as above, but processes a change to only one task
  private async updateTask(user: schema.EUserInfo, task: schema.EUserTaskInfo) {
    this.user = user;
    this.tasksById.set(task.id, task);  // Replace only one task
    this.tasks = [...this.tasksById.values()];  // Rebuild the array
    await this.listener.handleUpdate();
  }

  // Queries for the microphone permission and updates status bits.
  private async checkPermissions() {
    try {
      const p = await navigator.permissions.query({name: 'microphone' as PermissionName});
      if (!p || !p.state || `${p.state}` === 'ask' || `${p.state}` === 'prompt') {
        this.hasMicrophonePermission = 'maybe';
      } else if (p.state === 'granted') {
        this.hasMicrophonePermission = 'yes';
      } else if (p.state === 'denied') {
        this.hasMicrophonePermission = 'no';
      }
    } catch (e) {
      // The Permission API for microphone is unsupported on Firefox, so we just have to try it.
      console.log(`Failed to query microphone permission, assuming we'll have to ask.`);
      this.hasMicrophonePermission = 'maybe';
    }
  }
}

// Callback interface for Data changes
export interface Listener {
  // Called when something about the user's status or data changes
  handleUpdate(): Promise<void>;
}
