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

import "source-map-support/register";  // Improves stack traces
import functions = require('firebase-functions');
import express = require('express');
const cookieParser = require('cookie-parser')();
const useragent = require('useragent');
import bodyParser = require('body-parser');
import {EStorage, ETaskSet, EUser} from './estorage';
import {UserRequest, FBUser, checkAuthenticated, checkAdmin} from './acl';
import {parseTasksFile, HTTPError, ParamError, AccessError, NotFoundError,
        requireLanguage, requireParam, requireArray, requireInt, requireDocId,
        requireLCId} from './util';
import {normalizeTags, listhas, toBatches} from '../../commonsrc/util';
import {EAssignmentRule} from '../../commonsrc/schema';
import * as schema from '../../commonsrc/schema';
import {Readable} from 'stream';


// Implements the API server endpoints and per-request state needed for API logic.
export class AudioApi {

  // The request and response being handled.
  req: express.Request;
  rsp: express.Response;

  // Helper for accessing Firestore and GCS
  storage: EStorage;
  now: number;  // The time the request started

  // Creates an API handler, which lives for one request or one middleware invocation.
  constructor(req: express.Request, rsp: express.Response, deps?: any) {
    this.req = req;
    this.rsp = rsp;
    this.storage = new EStorage(deps);
    this.now = Date.now();
  }

  // Installs all middleware and endpoint handlers in an express server, and returns it as a Cloud Function.
  static createExpressServer(deps?: any): express.Express {
    const server = express();
    
    // Install middleware
    server.use(cookieParser);
    server.use(bodyParser.raw({
      limit: '10000kb',
      type: 'application/octet-stream'
    }));
    if (deps && deps.auth) {
      server.use(deps.auth);
    } else {
      server.use((req, res, next) => AudioApi.checkAuth(req, res, next));
    }

    // Install API endpoints
    AudioApi.installJSONApi(  server, deps, '/api/getuser',                    'runApiGetUser',                   'post');
    AudioApi.installJSONApi(  server, deps, '/api/listconsents',               'runApiListConsents',              'post');
    AudioApi.installJSONApi(  server, deps, '/api/signup',                     'runApiSignup',                    'post');
    AudioApi.installJSONApi(  server, deps, '/api/updateagreements',           'runApiUpdateAgreements',          'post');
    AudioApi.installJSONApi(  server, deps, '/api/uploadaudio',                'runApiUploadAudio',               'post');
    AudioApi.installStreamApi(server, deps, '/api/getaudio',                   'runApiGetAudio',                  'get');
    AudioApi.installJSONApi(  server, deps, '/api/deleteaudio',                'runApiDeleteAudio',               'post');
    AudioApi.installStreamApi(server, deps, '/api/getconsenttext',             'runApiGetConsentText',            'get');
    AudioApi.installStreamApi(server, deps, '/api/gettaskimage',               'runApiGetTaskImage',              'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/newuser',              'runAdminApiNewUser',              'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/listusers',            'runAdminApiListUsers',            'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/listuserwork',         'runAdminApiListUserWork',         'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/edituser',             'runAdminApiEditUser',             'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/listtasksets',         'runAdminApiListTaskSets',         'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/newtaskset',           'runAdminApiNewTaskSet',           'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/listtasks',            'runAdminApiListTasks',            'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/edittaskset',          'runAdminApiEditTaskSet',          'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/newtask',              'runAdminApiNewTask',              'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/bulkaddtasks',         'runAdminApiBulkAddTasks',         'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/assigntasks',          'runAdminApiAssignTasks',          'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/removetasks',          'runAdminApiRemoveTasks',          'post');
    AudioApi.installStreamApi(server, deps, '/api/admin/getaudio',             'runAdminApiGetAudio',             'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/listconsents',         'runAdminApiListConsents',         'get');
    AudioApi.installJSONApi(  server, deps, '/api/admin/newconsent',           'runAdminApiNewConsent',           'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/editconsent',          'runAdminApiEditConsent',          'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/uploadconsentversion', 'runAdminApiUploadConsentVersion', 'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/deleteconsentversion', 'runAdminApiDeleteConsentVersion', 'post');
    AudioApi.installJSONApi(  server, deps, '/api/admin/uploadtaskimage',      'runAdminApiUploadTaskImage',      'post');
    
    return server;
  }

  // Wraps an express server in a cloud function
  static install(deps?: any): functions.HttpsFunction {
    const express = AudioApi.createExpressServer(deps);
    return functions.https.onRequest(express);
  }

  // Defines an express JSON endpoint with error handling.
  static installJSONApi(server: express.Express, deps: any, path: string, fnkey: keyof AudioApi, method: 'get'|'post') {
    const fn = async (req: express.Request, rsp: express.Response) => {
      const result = await AudioApi.runMemberEndpoint(fnkey, req, rsp, deps);
      if (result) {
        rsp.json(result);
      }
    };

    if (method === 'get') {
      server.get(path, fn);
    } else {
      server.post(path, fn);
    }
  }

  // Defines a streaming express endpoint with error handling.
  static installStreamApi(server: express.Express, deps: any, path: string, fnkey: keyof AudioApi, method: 'get'|'post') {
    const fn = async (req: express.Request, rsp: express.Response) => {
      const result = await AudioApi.runMemberEndpoint(fnkey, req, rsp, deps);
      if (result) {
        const [ctype, readStream] = result as [string, Readable];
        rsp.type(ctype);
        readStream.pipe(rsp);
      }
    };

    if (method === 'get') {
      server.get(path, fn);
    } else {
      server.post(path, fn);
    }
  }

  // Instantiates the request-scoped helper and runs the endpoint.
  private static async runMemberEndpoint(fnkey: keyof AudioApi, req: express.Request, rsp: express.Response, deps: any): Promise<unknown[]|undefined> {
    try {
      // Run the function and see if it returns normally
      const helper = new AudioApi(req, rsp, deps);
      const fn = helper[fnkey] as () => Promise<unknown[]>;
      return await fn.bind(helper)();

    } catch (e) {
      // Crash, handle errors with appropriate return message and response code
      console.error(e);
      if (e instanceof HTTPError) {
        rsp.status(e.code).json([e.message]);
      } else {
        rsp.status(500).json([`Server error while processing: ${req.url}`]);
      }
      return undefined;
    }
  }

  // Verifies that the auth cookie is present and validates the endpoint path against the user type.
  private static async checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.path.startsWith('/api/public/')) {
      // The public endpoints don't require sign-in, but everything else does
      if (await checkAuthenticated(req, res)) {
        // The admin endpoints also require that the user is a registered administrator
        if (req.path.startsWith('/api/admin/')) {
          // if checkAuthenticated has run then this will be a valid UserRequest
          if (await checkAdmin(req as UserRequest, res)) {
            next();  // allow admin request
          }
        } else {
          next();  // allow user request
        }
      }
    } else {
      next();  // allow public request
    }
  }

  // Returns the Firebase User associated with the current request.
  getUser(): FBUser {
    const ureq = this.req as UserRequest;
    const user = ureq.user;
    if (!user) {
      throw new AccessError('No credentials found in request', 401);
    }
    return user;
  }

  // Parses the request body as JSON and returns the resulting struct
  getBodyJSON(): any {
    return JSON.parse(this.req.body);
  }

  // Loads and returns the EUser matching this request, or fails with an access error if they aren't enrolled.
  async requireUserByFBUID(opt_txn?: FirebaseFirestore.Transaction): Promise<EUser> {
    const user = await this.storage.loadUserByFBUID(this.getUser().uid, opt_txn);
    if (!user) {
      throw new AccessError('User not enrolled');
    }
    return user;
  }

  // Returns the currently logged in user, all their tasks, and their consent status
  async runApiGetUser(): Promise<[schema.EUserInfo, schema.EUserTaskInfo[], boolean]|[]> {
    const user = await this.storage.loadUserByFBUID(this.getUser().uid);
    if (user) {
      const tasks = await user.listTasks();
      const isConsented = await user.isConsented(this.now);
      return [user.info, tasks.map(t => t.info), isConsented];
    } else {
      return [];  // No user
    }
  }

  // Returns the live version of all applicable consents for a given language and tag set.
  async runApiListConsents() {
    const info = this.getBodyJSON();
    const language = requireLanguage(info.language);
    const tags = normalizeTags(info.tags);

    const consents = await this.storage.listApplicableConsents(language, tags, this.now);
    return consents.map(c => c.infoWithOnlyLiveVersion(this.now));
  }

  // Signs this user up, creating (or linking) their user account
  async runApiSignup(): Promise<[schema.EUserInfo, schema.EUserTaskInfo[], boolean]> {
    const signupTimestamp = this.now;

    // Resolve the consents they agreed to
    const info = this.getBodyJSON();
    const userConsents = requireArray(info.agreements as schema.EAgreementInfo[], 1);
    const demographics = info.demographics as schema.UserDemographics;

    // Interest form safety checks; these shouldn't ever trigger if the form works right.
    if (!demographics || !demographics.consentStorage || !demographics.consentInitials || !demographics.acceptTos) {
      throw new ParamError(`Attempted to sign up without interest form agreement`);
    }

    // Define the new user
    const idinfo = this.getUser();
    const newuser: schema.NewUserInfo = {
      email: idinfo.email,
      name: demographics.name ? demographics.name : idinfo.name,
      fbuid: idinfo.uid,
      fbname: idinfo.name,
      language: requireLanguage(info.language),
      tags: normalizeTags(info.tags as string[]),
      signupTimestamp,
      notes: '',
      demographics
    };

    let user = await this.storage.signUpUser(newuser);
    for (const consent of userConsents) {
      user = await user.addConsent(this.now, consent);
    }
    const isConsented = await user.isConsented(this.now);
    const tasks = await user.listTasks();
    return [user.info, tasks.map(t => t.info), isConsented];
  }

  async runApiUpdateAgreements(): Promise<[schema.EUserInfo, boolean]> {
    const info = this.getBodyJSON();
    const agreements = requireArray(info.agreements as schema.EAgreementInfo[], 1);
    let user = await this.requireUserByFBUID();
    for (const agreement of agreements) {
      user = await user.addConsent(this.now, agreement);
    }
    const isConsented = await user.isConsented(this.now);
    return [user.info, isConsented];
  }

  // Creates a recording file for a task.
  async runApiUploadAudio() {
    const task = requireParam(JSON.parse(this.req.query.task as string)) as schema.EUserTaskInfo;
    const localdate = requireParam(this.req.query.localdate as string);
    const tzo = requireInt(this.req.query.tzo as string);
    const mimeType = requireParam(this.req.query.mimeType as string);
    const deviceinfo = useragent.parse(this.req.headers['user-agent']);
    const deviceinfoObj = deviceinfo ? deviceinfo.toJSON() : {};

    // Save the new recording and return the final versions of all data
    const user = await this.requireUserByFBUID();
    const [euser, etask, recording] = await this.storage.createRecording(user, task, localdate, tzo, mimeType, deviceinfoObj, this.req.body);
    return [euser.info, etask.info, recording.metadata];
  }

  // Let's a user listen to their own audio
  async runApiGetAudio() {
    const ts = requireInt(this.req.query.ts as string);

    const [user, basename, mimeType] = await this.storage.run(async txn => {
      const user = await this.requireUserByFBUID(txn);
      const rec = await user.loadRecording(txn, ts);
      return [user, rec.metadata.name, rec.metadata.mimeType];
    });

    const [wavFile, ] = this.storage.findRecordingFiles(user.euid, basename);
    const contentType = this.getServingType(mimeType);
    return [contentType, wavFile.createReadStream()];
  }

  // Parses the correct mime type from the metadata (if present)
  private getServingType(mimeType: string) {
    if (!mimeType) {
      return 'application/octet-stream';  // Legacy stream, we don't know what it is actually!
    }
    
    const codecParts = mimeType.split(';');
    if (codecParts.length > 1) {
      return codecParts[0].trim();  // dont serve back the codec hint since that's not a valid content type
    } else {
      return mimeType;
    }
  }

  // Let's a user delete to their own audio, and returns the changed user and task
  async runApiDeleteAudio() {
    const taskId = requireParam(this.req.query.taskId as string);

    const {user, task, basename} = await this.storage.run(async txn => {
      const user = await this.requireUserByFBUID(txn);
      const task = await user.loadTask(txn, taskId);
      if (task.info.recordedTimestamp === 0) {
        throw new NotFoundError(`No task recording found: ${taskId}`);
      }
      const taskSet = await this.storage.requireTaskSet(task.info.taskSetId);
      const tsTask = await taskSet.loadTask(txn, task.info.task.id);
      const rec = await user.loadRecording(txn, task.info.recordedTimestamp);
      const basename = rec.metadata.name;
      await rec.delete(user, task, tsTask, txn);
      return {user, task, basename};
    });

    // The firestore record is gone, also delete the GCS files
    const [wavFile, jsonFile] = this.storage.findRecordingFiles(user.euid, basename);
    await wavFile.delete();
    await jsonFile.delete();
    return [user.info, task.info];
  }

  async runApiGetConsentText() {
    const consentId = requireParam(this.req.query.consentId as string);
    const version = requireInt(this.req.query.version as string);
    this.storage.requireConsent(consentId);  // Ensure this is a real consent
    const file = this.storage.getConsentFile(consentId, version);
    return ['text/html', file.createReadStream()];
  }

  async runApiGetTaskImage() {
    const taskSetId = requireLCId(this.req.query.taskSetId as string);
    const taskId = requireDocId(this.req.query.taskId as string);
    const mimeType = requireParam(this.req.query.mimeType as string);

    const file = this.storage.getImageFile(taskSetId, taskId);
    return [mimeType, file.createReadStream()];
  }

  async runAdminApiNewUser() {
    // Creates a new user without their login info
    const newuser: schema.NewUserInfo = this.getBodyJSON();
    requireParam(newuser.name);
    requireParam(newuser.email);
    newuser.tags = normalizeTags(newuser.tags);
    const [user, taskSets] = await this.storage.createUser(newuser);
    return [user.info, taskSets.map(ts => ts.info)];
  }

  // Returns a list of all Users in the system
  async runAdminApiListUsers() {
    const users = await this.storage.listUsers();
    return users.map(user => user.info);
  }

  // Returns the User, their assigned UserTasks, and any Recordings
  async runAdminApiListUserWork() {
    const euid: string = requireParam(this.req.query.euid as string);
    const user = await this.storage.loadUser(euid);
    const tasks = await user.listTasks();
    const recordings = await user.listRecordings();
    return [user.info, tasks.map(task => task.info), recordings.map(r => r.metadata)];
  }

  // Edits an existing user's mutable fields
  async runAdminApiEditUser() {
    const info = this.getBodyJSON();
    const euid: string = requireParam(info.euid);
    const name: string = requireParam(info.name);
    const email: string = requireParam(info.email);
    const language: string = requireLanguage(info.language);
    const tags: string[] = requireParam(normalizeTags(info.tags));
    const notes: string = info.notes;

    const user: EUser = await this.storage.run(async txn => {
      const u = await this.storage.loadUser(euid, txn);
      u.info.name = name;
      u.info.email = email;
      u.info.language = language;
      u.info.tags = tags;
      u.info.notes = notes;
      u.update(txn);
      return u;
    });
    return [user.info];
  }

  // Returns a list of all TaskSets in the system
  async runAdminApiListTaskSets() {
    const tasksets = await this.storage.listTaskSets();
    return tasksets.map(ts => ts.info);
  }

  // Creates a new TaskSet
  async runAdminApiNewTaskSet() {
    const info = this.getBodyJSON();
    const id = requireLCId(info.id as string);
    const name = requireParam(info.name as string);
    const language = requireLanguage(info.language as string);

    const ts = await this.storage.createTaskSet(id, name, language);
    return [ts.info];
  }

  // Returns the TaskSet along with all of its tasks
  async runAdminApiListTasks() {
    const taskSetId = requireParam(this.req.query.taskSetId as string);
    const ts = await this.storage.requireTaskSet(taskSetId);
    const tasks = await ts.listTasks();
    return [ts.info, tasks.map(task => task.info)];
  }

  // Updates a TaskSet's mutable fields
  async runAdminApiEditTaskSet() {
    const info = this.getBodyJSON();
    const taskSetId = requireParam(info.taskSetId as string);
    const name = info.name as string|undefined;
    const language = info.language as string|undefined;
    const addrules = info.addrules as EAssignmentRule[];
    const delrules = info.delrules as number[];
    if (!name && !language && addrules.length === 0 && delrules.length === 0) {
      throw new ParamError('Must change at least one field');
    }
    const ts: ETaskSet = await this.storage.run(async txn => {
      const ts = await this.storage.requireTaskSet(taskSetId, txn);
      if (addrules.length > 0 || delrules.length > 0) {
        ts.changeRules(addrules, delrules);
      }
      if (name) {
        ts.info.name = name;
      }
      if (language) {
        ts.info.language = requireLanguage(language);
      }
      await ts.update(txn);
      return ts;
    });
    return [ts.info];
  }

  // Adds a Task to the given TaskSet
  async runAdminApiNewTask() {
    const info = this.getBodyJSON();
    const taskSetId = requireParam(info.taskSetId as string);
    const prompt = requireParam(info.prompt as string);
    const order = requireInt(info.order as string);
    const taskType = requireParam(info.taskType as schema.TaskType);
    if (!listhas(taskType, 'prompt', 'response')) {
      throw new ParamError(`Invalid task type: ${taskType}`);
    }

    const ts = await this.storage.requireTaskSet(taskSetId);
    const tasks = await ts.addTasks(taskType, [[order, prompt]]);
    return tasks.length > 0 ? [tasks[0].info] : [];
  }

  // Bulk adds a whole file of prompts to a given TaskSet
  async runAdminApiBulkAddTasks() {
    const taskSetId = requireParam(this.req.query.taskSetId as string);
    const format = requireParam(this.req.query.format as string);
    const orderStart = requireInt(this.req.query.orderStart as string);
    if (format !== 'txt') {
      throw new ParamError(`Unsupported format: ${format}`);
    }
    const ts = await this.storage.requireTaskSet(taskSetId);
    const tasks = parseTasksFile(this.req.body, format, orderStart);
    const result = await ts.addTasks('prompt', tasks);
    return [result.length];
  }

  // Assigns a list, sampling, or taskset of tasks to one user.
  async runAdminApiAssignTasks() {
    const info = this.getBodyJSON();
    const taskSetId = requireParam(info.taskSetId as string);
    const spec = requireParam(info.spec as EAssignmentRule);
    const euid = requireParam(info.euid as string);
    const ts = await this.storage.requireTaskSet(taskSetId);
    const user = await ts.assignTasks(spec, euid);
    return [user.info, ts.info];
  }

  // Removes a list of tasks from one user, if they have no recordings.
  async runAdminApiRemoveTasks() {
    const info = this.getBodyJSON();
    const euid = requireParam(info.euid as string);
    const idTuples = requireArray(info.idTuples as Array<[string, string]>, 1);  // list of [taskSetId, taskId]
    let user: EUser;
    let taskSets: ETaskSet[];
    for (const idTuplesBatch of toBatches(idTuples, 450)) {
      [user, taskSets] = await this.storage.run(async txn => {
        const u = await this.storage.loadUser(euid, txn);
        const tss = await u.removeTasks(txn, idTuplesBatch);
        return [u, tss];
      });
    }

    const tsInfo = taskSets!.map(ts => ts.info);
    return [user!.info, tsInfo];
  }

  // Returns the raw audio for a recording
  async runAdminApiGetAudio() {
    const euid = requireParam(this.req.query.euid as string);
    const name = requireParam(this.req.query.name as string);
    const [wavFile, ] = this.storage.findRecordingFiles(euid, name);
    return ['audio/wav', wavFile.createReadStream()];
  }

  // Returns a list of all Consents in the system
  async runAdminApiListConsents() {
    const consents = await this.storage.listConsents();
    return consents.map(c => c.info);
  }

  // Creates a new Consent
  async runAdminApiNewConsent() {
    const info = this.getBodyJSON();
    const id = requireLCId(info.id as string);
    const name = requireParam(info.name as string);
    const language = requireLanguage(info.language as string);
    const tags: string[] = requireParam(normalizeTags(info.tags));
    const optional = requireParam(info.optional as boolean);

    const consent = await this.storage.createConsent(id, name, language, tags, optional);
    return [consent.info];
  }

  // Updates a Consent's mutable fields
  async runAdminApiEditConsent() {
    const pinfo = this.getBodyJSON();
    const consentId = requireParam(pinfo.id as string);
    const name = pinfo.name as string|undefined;
    const language = pinfo.language as string|undefined;
    const active = pinfo.active as boolean|undefined;
    const optional = pinfo.optional as boolean|undefined;
    const tags = pinfo.tags as string[]|undefined;
    if (!name && !language && tags === undefined && active === undefined && optional === undefined) {
      throw new ParamError('Must change at least one field');
    }

    const {info} = await this.storage.run(async txn => {
      let consent = await this.storage.requireConsent(consentId, txn);
      if (name) {
        consent.info.name = name;
      }
      if (language) {
        consent.info.language = requireLanguage(language);
      }
      if (active !== undefined) {
        consent.info.active = active;
      }
      if (optional !== undefined) {
        consent.info.optional = optional;
      }
      if (tags !== undefined) {
        consent.info.tags = tags;
      }
      consent.update(txn);
      return consent;
    });
    return [info];
  }

  // Creates a consent version.
  async runAdminApiUploadConsentVersion() {
    const consentId = requireParam(this.req.query.id as string);
    const description = requireParam(this.req.query.description as string);
    const liveTimestamp = requireInt(this.req.query.liveTimestamp as string);
    const {info} = await this.storage.run(async txn => {
      const consent = await this.storage.requireConsent(consentId, txn);
      await consent.createVersion(description, liveTimestamp, this.req.body, txn);
      return consent;
    });
    return [info];
  }

  // Deletes a consent version if it is unused
  async runAdminApiDeleteConsentVersion() {
    const pinfo = this.getBodyJSON();
    const consentId = requireParam(pinfo.id as string);
    const version = requireInt(pinfo.version as string);

    const {info} = await this.storage.run(async txn => {
      const consent = await this.storage.requireConsent(consentId, txn);
      consent.deleteVersion(version, txn);
      return consent;
    });
    return [info];
  }

  // Stores a task image blob that goes with a task, and attaches it to the task.
  async runAdminApiUploadTaskImage(): Promise<schema.ETaskInfo> {
    const taskSetId = requireLCId(this.req.query.taskSetId as string);
    const taskId = requireDocId(this.req.query.taskId as string);

    // Save the image and convert the task to be an image task.
    return await this.storage.run(async txn => {
      const taskSet = await this.storage.requireTaskSet(taskSetId, txn);
      const task = await taskSet.loadTask(txn, taskId);
      await task.addImage(this.req.body, txn);
      return task.info;
    });
  }
}

exports.audioapp = AudioApi.install();
