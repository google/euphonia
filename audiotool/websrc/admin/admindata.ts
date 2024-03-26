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

import * as schema from '../../commonsrc/schema';
import {authenticatedFetch, postAsJson, Spinner, errorToast} from '../util';

// A DAO for data from the server. Also handles spinner and error UI.
export class AdminData {
  listener: Listener;

  // We cache these big lists so we don't have to re-fetch them.
  users = new Map<string, schema.EUserInfo>();  // by EUID
  tasksets = new Map<string, schema.ETaskSetInfo>();  // by TSID
  consents = new Map<string, schema.EConsentInfo>();  // by ConsentId

  constructor(listener: Listener) {
    this.listener = listener;
  }

  // Returns the user with the given email, if any
  findUserByEmail(email: string): schema.EUserInfo|undefined {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  // Reloads the main lists of users and task sets
  async update(): Promise<void> {
    await this.run(['users', 'tasksets', 'consents'], async () => {
      // TODO: we  could combine these into one endpoint to save a round trip
      for (const user of await (await authenticatedFetch('/api/admin/listusers')).json() as schema.EUserInfo[]) {
        this.users.set(user.euid, user);
      }
      for (const ts of await (await authenticatedFetch('/api/admin/listtasksets')).json() as schema.ETaskSetInfo[]) {
        this.tasksets.set(ts.id, ts);
      }
      for (const c of await (await authenticatedFetch('/api/admin/listconsents')).json() as schema.EConsentInfo[]) {
        this.consents.set(c.id, c);
      }
    });
  }

  // Accesses the server, shows the user a spinner, and toasts on errors.
  private async run<X>(changes: string[] = ['data'], fn: () => Promise<X>): Promise<X|undefined> {
    return await Spinner.waitFor(async () => {
      let result: X|undefined;
      try {
        result = await fn();
      } catch (e) {
        console.log(e);
        errorToast(`${e}`);
        result = undefined;
      }

      // Notify the app to update, even if there was an error
      if (changes.indexOf('users') !== -1 || changes.indexOf('tasksets') !== -1 || changes.indexOf('consents') !== -1) {
        await this.listener.onDataChanged();
      }
      if (changes.indexOf('tasks') !== -1) {
        await this.listener.onTasksChanged();
      }
      if (changes.indexOf('usertasks') !== -1) {
        await this.listener.onUserTasksChanged();
      }
      return result;
    });
  }

  // Creates a user and updates the app with it
  async addUser(name: string, email: string, language: string, tags: string[], notes: string): Promise<void> {
    await this.run(['users', 'tasksets'], async () => {
      const existingUser = this.findUserByEmail(email);
      if (existingUser) {
        throw new Error(`Email already enrolled: ${email} is ${existingUser.euid}`);
      }
      const info: schema.NewUserInfo = {
        email, name, language, tags, notes,
        signupTimestamp: 0
      };
      const [user, taskSets] = await postAsJson('/api/admin/newuser', info) as [schema.EUserInfo, schema.ETaskSetInfo[]];
      this.users.set(user.euid, user);

      // TaskSets' counters can change during user creation because of enrollment rules
      for (const ts of taskSets) {
        this.tasksets.set(ts.id, ts);
      }
    });
  }

  // Edits an existing user
  async editUser(euid: string, name: string, email: string, language: string, tags: string[], notes: string) {
    await this.run(['users'], async () => {
      const info = {euid, email, name, language, tags, notes};
      const [user] = await postAsJson('/api/admin/edituser', info) as [schema.EUserInfo];
      this.users.set(user.euid, user);
    });
  }

  // Deletes an existing user
  async deleteUser(euid: string) {
    await this.run(['users'], async () => {
      const info = {euid};
      const [user] = await postAsJson('/api/admin/deleteuser', info) as [schema.EUserInfo];
      this.users.set(user.euid, user);
    });
  }

  // Assigns a selection of tasks to a list of users, returning which euids were successful.
  async assignTasks(euids: string[], taskSetId: string, spec: schema.EAssignmentRule): Promise<string[]> {
    const rv = await this.run(['users', 'usertasks', 'tasksets'], async () => {
      const result: string[] = [];
      for (const euid of euids) {
        const [user, ts] = await postAsJson('/api/admin/assigntasks', {taskSetId, euid, spec}) as [schema.EUserInfo, schema.ETaskSetInfo];
        this.users.set(user.euid, user);
        this.tasksets.set(ts.id, ts);
        result.push(euid);
      }
      return result;
    });

    return rv ? rv : [];  // an empty list means none were successful
  }

  // Deletes tasks from a user
  async removeTasks(euid: string, tasks: schema.EUserTaskInfo[]): Promise<void> {
    const idTuples = tasks.map(task => [task.taskSetId, task.id]);
    await this.run(['users', 'usertasks', 'tasksets'], async () => {
      const [user, tslist] = await postAsJson('/api/admin/removetasks', {euid, idTuples}) as [schema.EUserInfo, schema.ETaskSetInfo[]];
      this.users.set(user.euid, user);
      for (const ts of tslist) {
        this.tasksets.set(ts.id, ts);
      }
    });
  }

  // Creates a task set and updates the app with it
  async addTaskSet(id: string, name: string, language: string) {
    await this.run(['tasksets'], async () => {
      const [ts] = await postAsJson('/api/admin/newtaskset', {id, name, language}) as [schema.ETaskSetInfo];
      this.tasksets.set(ts.id, ts);
    });
  }

  // Adds an enrollment rule to a task set
  async addTaskSetRule(taskSetId: string, id:number, order: number, tags: string[], action: string, sample: number): Promise<void> {
    const rule: schema.EAssignmentRule = {
      id, order, tags,
      allTasks: action === 'all',
      taskIds: [],
      sample: action === 'sample' ? sample : 0
    };
    await this.editTaskSet({
      taskSetId,
      delrules: [],
      addrules: [rule],
    });
  }

  // Removes an enrollment rule from a task set
  async deleteTaskSetRule(taskSetId: string, ruleId:number): Promise<void> {
    await this.editTaskSet({
      taskSetId,
      delrules: [ruleId],
      addrules: [],
    });
  }

  // Changes a task set's name and language
  async editTaskSetInfo(taskSetId: string, name: string, language: string): Promise<void> {
    await this.editTaskSet({
      taskSetId, name, language,
      delrules: [],
      addrules: [],
    });
  }

  // Changes a task set and updates it in the database
  private async editTaskSet(info: {taskSetId: string, delrules: number[], addrules: schema.EAssignmentRule[], name?: string, language?: string}): Promise<void> {
    await this.run(['tasksets'], async () => {
      const [ts] = await postAsJson('/api/admin/edittaskset', info) as [schema.ETaskSetInfo];
      this.tasksets.set(ts.id, ts);
    });
  }

  // Adds one task to a task set, with optional image
  async addTask(taskSetId: string, taskType: schema.TaskType, prompt: string, order: number, imageData?: ArrayBuffer) {
    await this.run(['tasksets', 'tasks'], async () => {
      const newTasks = await postAsJson('/api/admin/newtask', {taskSetId, prompt, order, taskType}) as schema.ETaskInfo[];
      if (newTasks.length > 0 && imageData) {
        // Convert this to an image task
        const args = {taskSetId, taskId: newTasks[0].id};
        await authenticatedFetch('/api/admin/uploadtaskimage', args, 'post', imageData);
        // TODO: we could receive and update taskset proto here instead of reloading the whole thing
      }
    });
  }

  // Adds tasks from an uploaded CSV file to a task set
  async bulkUploadTasks(taskSetId: string, data: ArrayBuffer, orderStart: number) {
    await this.run(['tasksets', 'tasks'], async () => {
      const format = 'txt';
      await authenticatedFetch('/api/admin/bulkaddtasks', {taskSetId, format, orderStart}, 'post', data);
      // TODO: we could receive and update taskset proto here instead of reloading the whole thing
    });
  }

  // Fetches the full task list for a taskset.
  async loadTasksetTasks(taskSetId: string): Promise<schema.ETaskInfo[]> {
    const rv = await this.run(['tasksets'], async () => {
      const rsp = await authenticatedFetch('/api/admin/listtasks', {taskSetId});
      const [taskset, tasks] = await rsp.json() as [schema.ETaskSetInfo?, schema.ETaskInfo[]?];
      if (!taskset || !tasks) {
        throw new Error('Unexpected empty result from task fetch');
      }
      this.tasksets.set(taskset.id, taskset);
      return tasks;
    });
    return rv ? rv : [];  // empty result on errors
  }

  // Gets the detailed list of user tasks and recordings.
  async loadUserWork(euid: string): Promise<[schema.EUserTaskInfo[], schema.ERecordingMetadata[]]> {
    const rv = await this.run(['users'], async () => {
      const rsp = await authenticatedFetch('/api/admin/listuserwork', {euid});
      const [user, tasks, recordings] = await rsp.json() as [schema.EUserInfo?, schema.EUserTaskInfo[]?, schema.ERecordingMetadata[]?];
      if (!user || !tasks || !recordings) {
        throw new Error('Unexpected empty result from user fetch');
      }
      this.users.set(user.euid, user);
      const result: [schema.EUserTaskInfo[], schema.ERecordingMetadata[]] = [tasks, recordings];
      return result;
    });
    return rv ? rv : [[], []];  // empty result on errors
  }

  // Creates a consent and updates the app with it
  async addConsent(id: string, name: string, language: string, tags: string[], optional: boolean) {
    await this.run(['consents'], async () => {
      const [consent] = await postAsJson('/api/admin/newconsent', {id, name, language, tags, optional}) as [schema.EConsentInfo];
      this.consents.set(consent.id, consent);
    });
  }

  // Changes a consent's metadata
  async editConsentInfo(id: string, name: string, language: string, tags: string[], active: boolean, optional: boolean): Promise<void> {
    await this.run(['consents'], async () => {
      const [consent] = await postAsJson('/api/admin/editconsent', {id, name, language, tags, active, optional}) as [schema.EConsentInfo];
      this.consents.set(consent.id, consent);
    });
  }

  // Uploads a new consent document
  async addConsentVersion(id: string, description: string, liveTimestamp: number, html: ArrayBuffer): Promise<void> {
    await this.run(['consents'], async () => {
      const args = {id, description, liveTimestamp};
      const rsp = await authenticatedFetch('/api/admin/uploadconsentversion', args, 'post', html);
      const [consent] = await rsp.json();
      this.consents.set(consent.id, consent);
    });
  }

  async deleteConsentVersion(id: string, version: number): Promise<void> {
    await this.run(['consents'], async () => {
      const [consent] = await postAsJson('/api/admin/deleteconsentversion', {id, version}) as [schema.EConsentInfo];
      this.consents.set(consent.id, consent);
    });
  }
}

// Callback interface for AdminData changes
export interface Listener {
  // Called when the cached list of users, tasksets, or consents is reloaded
  onDataChanged(): Promise<void>;

  // Called when users' tasks may have changed
  onUserTasksChanged(): Promise<void>;

  // Called when a taskset's tasks may have changed
  onTasksChanged(): Promise<void>;
}
