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

  // The user's currently assigned tasks, if any
  tasks: schema.EUserTaskInfo[] = [];
  tasksById: Map<string, schema.EUserTaskInfo> = new Map();

  constructor(listener: Listener) {
    this.listener = listener;
    firebase.auth().onAuthStateChanged(async (user: FBUser) => await this.handleUserAuth_(user));
  }

  // Called when Firebase gets a sign-in
  async handleUserAuth_(fbuser: FBUser): Promise<void> {
    this.fbuser = fbuser;
    if (this.fbuser == null) {
      await this.listener.handleUpdate();

    } else {
      // Load whatever we know about the user and then update the UI
      const result = await postAsJson('/api/getuser', {});
      const [euser, etasks, isConsented] = result as [schema.EUserInfo, schema.EUserTaskInfo[], boolean];
      this.consented = isConsented;
      this.consentCheckTimestamp = Date.now();
      if (euser) {
        this.updateFields_(euser, etasks);
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
    this.updateFields_(euser, etasks);
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
  async saveAudio(task: schema.EUserTaskInfo, audioData: Blob) {
    return await Spinner.waitFor(async () => {
      const audio = await audioData.arrayBuffer();
      const now = new Date();
      const args = {
        task: JSON.stringify(task),
        localdate: formatDateCode(now),
        tzo: now.getTimezoneOffset()
      };
      const rsp = await authenticatedFetch('/api/uploadaudio', args, 'post', audio);
      const [euser, etask, erec] = await rsp.json() as [schema.EUserInfo, schema.EUserTaskInfo, schema.ERecordingMetadata];
      await this.updateTask_(euser, etask);
      return erec;
    });
  }

  // Deletes a recording and updates the user.
  async deleteAudio(task: schema.EUserTaskInfo) {
    await Spinner.waitFor(async () => {
      const taskId = task.id;
      const rsp = await authenticatedFetch('/api/deleteaudio', {taskId}, 'post');
      const [euser, etask] = await rsp.json() as [schema.EUserInfo, schema.EUserTaskInfo];
      await this.updateTask_(euser, etask);
    });
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

  // Returns true if all required fields in the demographics struct are complete.
  isCompletedDemographics(): boolean {
    let d: schema.UserDemographics;
    if (this.user && this.user.demographics) {
      d = this.user.demographics;
    } else {
      d = this.loadDemographics();
    }
    return (!!d.country &&
      (d.country != 'USA' || !!d.state) &&
      (d.hasHelper != undefined) &&
      (!d.hasHelper || !!d.helperEmail) &&
      !!d.consentStorage &&
      !!d.consentInitials &&
      !!d.acceptTos);
  }

  // Acquires updated data from the server's responses
  updateFields_(user: schema.EUserInfo, tasks: schema.EUserTaskInfo[]) {
    this.user = user;
    this.tasks = tasks;
    this.tasksById.clear();
    for (let task of tasks) {
      this.tasksById.set(task.id, task);
    }
  }

  // Same as above, but processes a change to only one task
  async updateTask_(user: schema.EUserInfo, task: schema.EUserTaskInfo) {
    this.user = user;
    this.tasksById.set(task.id, task);  // Replace only one task
    this.tasks = [...this.tasksById.values()];  // Rebuild the array
    await this.listener.handleUpdate();
  }
}

// Callback interface for Data changes
export interface Listener {
  // Called when something about the user's status or data changes
  handleUpdate(): Promise<void>;
}
