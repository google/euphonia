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

// DAO object for working with stored data in GCS and Firestore
import { Storage, File } from '@google-cloud/storage';
import { Firestore, FieldPath, CollectionReference } from '@google-cloud/firestore';
import * as firebaseconfig from './firebaseconfig';
import * as schema from '../../commonsrc/schema';
import { normalizeEmail, NotFoundError, ParamError, requireLanguage } from './util';
import { clone, shuffle } from '../../commonsrc/util';

type Transaction = FirebaseFirestore.Transaction;

export class EStorage {
  static EUID_TRIES = 50;

  firestore: Firestore;  // Firestore's TS configs seem broken
  storage: Storage;
  
  constructor(deps?: any) {
    this.firestore = deps ? deps.firestore : new Firestore();
    this.storage = deps ? deps.storage : new Storage();
    this.firestore.settings({ ignoreUndefinedProperties: true });
  }

  // Accessors for collections and sub-collections

  getUsersCollection(): CollectionReference {
    return this.firestore.collection(`${schema.USERS_TABLE}`);
  }

  getRecordingsSubcollection(euid: string): CollectionReference {
    return this.firestore.collection(`${schema.RECORDINGS_TABLE}/${euid}/${schema.RECORDINGS_SUBCOLLECTION}`);
  }

  getUserTasksSubcollection(euid: string): CollectionReference {
    return this.firestore.collection(`${schema.USERS_TABLE}/${euid}/${schema.TASKS_SUBCOLLECTION}`);
  }

  getTaskSetsCollection(): CollectionReference {
    return this.firestore.collection(`${schema.TASKSETS_TABLE}`);
  }

  getTasksSubcollection(tsid: string): CollectionReference {
    return this.firestore.collection(`${schema.TASKSETS_TABLE}/${tsid}/${schema.TASKS_SUBCOLLECTION}`);
  }

  getConsentsCollection(): CollectionReference {
    return this.firestore.collection(`${schema.CONSENTS_TABLE}`);
  }

  // Runs a transaction with the given function.
  async run<X>(fn: (txn: Transaction) => Promise<X>): Promise<X> {
    return this.firestore.runTransaction(fn);
  }

  // Returns the EUser with the given Firebase identity ID, or null if not created.
  async loadUserByFBUID(fbuid: string, opt_txn?: Transaction): Promise<EUser|null> {
    const q = this.getUsersCollection().where('fbuid', '==', fbuid).limit(1);
    const result = opt_txn ? await opt_txn.get(q) : await q.get();
    if (result.size === 1) {
      for (const doc of result.docs) {
        const data = doc.data() as schema.EUserData;
        return new EUser(this, schema.userPath(data.euid), data);
      }
    }
    return null;
  }

  // Returns the EUser with the given email, or null if not created.
  async loadUserByEmail(email: string, opt_txn?: Transaction): Promise<EUser|null> {
    const normedEmail = normalizeEmail(email);
    const q = this.getUsersCollection().where('normalizedEmail', '==', normedEmail).limit(1);
    const result = opt_txn ? await opt_txn.get(q) : await q.get();
    if (result.size === 1) {
      for (const doc of result.docs) {
        const data = doc.data() as schema.EUserData;
        return new EUser(this, schema.userPath(data.euid), data);
      }
    }
    return null;
  }

  // Returns the EUser with the given EUID, or fails if not created.
  async loadUser(euid: string, opt_txn?: Transaction): Promise<EUser> {
    const path = schema.userPath(euid);
    const userDoc = this.firestore.doc(path);
    const existingUserData = opt_txn ? await opt_txn.get(userDoc) : await userDoc.get();
    if (existingUserData.exists) {
      return new EUser(this, path, existingUserData.data() as schema.EUserData);
    } else {
      throw new NotFoundError(`No such user: ${euid}`);
    }
  }

  // Loads all users.
  async listUsers(): Promise<EUser[]> {
    const data = await this.getUsersCollection().get();
    return data.docs.map(doc => new EUser(this, doc.ref.path, doc.data() as schema.EUserData));
  }

  // Creates a user if they don't exist, or claims their existing user account otherwise.
  async signUpUser(newuser: schema.NewUserInfo): Promise<EUser> {
    // First see if they already have an account and we can just claim it
    const fbuid = newuser.fbuid;
    if (!fbuid) {
      throw new ParamError('FBUser info required for signup');
    }
    const user = await this.run(async txn => {
      let existingUser = await this.loadUserByFBUID(fbuid, txn);
      if (!existingUser) {
        // The user may have been pre-enrolled by an administrator
        existingUser = await this.loadUserByEmail(newuser.email, txn);
        if (!existingUser) {
          return null;  // This is a fresh signup, no existing record to update
        }
      }

      // Claim and update the existing record
      existingUser.fbuid = fbuid;
      existingUser.info.email = newuser.email;  // this can be slightly different due to normalization
      existingUser.info.fbname = newuser.fbname;
      existingUser.info.signupTimestamp = newuser.signupTimestamp;
      existingUser.info.demographics = newuser.demographics;
      existingUser.update(txn);
      return existingUser;
    });

    if (user != null) {
      return user;  // Successfully claimed an existing user record
    }

    // Otherwise, this is a fresh signup, create an all new user record
    const [createdUser, ] = await this.createUser(newuser);
    return createdUser;
  }

  // Creates a new EUser and runs all enrollment rules; also returns affected task set counters
  async createUser(newuser: schema.NewUserInfo): Promise<[EUser, ETaskSet[]]> {
    const taskSets = new Set<ETaskSet>();
    let user = await this.createUser_(newuser);

    // Run the assignment rules on this user in order. The last will be the most up to date.
    for (const [taskSet, rule] of await this.loadAssignmentRules(user)) {
      user = await taskSet.assignTasks(rule, user.euid);
      taskSets.add(taskSet);
    }

    return [user, [...taskSets]];
  }

  // Creates a new EUser, generating a new unique EUID for them within a transaction.
  private async createUser_(newuser: schema.NewUserInfo): Promise<EUser> {
    requireLanguage(newuser.language);

    for (let tries = 0; tries < EStorage.EUID_TRIES; tries++) {
      try {
        return await this.run(async txn => {
          // Make sure the normalized email is unique
          const user = await this.loadUserByEmail(newuser.email, txn);
          if (user) {
            throw new Error(`Email address already in use: ${user.info.email} (${user.normalizedEmail})`);
          } else {
            // Try to create a new user with a new EUID. We might have to retry
            return await this.createUserTxn(txn, newuser);
          }
        });

      } catch (e) {
        if (`${e}`.indexOf('retry: EUID in use') !== -1) {
          console.log('EUID collision, trying again...');
          continue;  // EUID collection, try again
        }
        throw e;
      }
    }
    throw new Error(`Could not generate EUID after ${EStorage.EUID_TRIES} tries`);
  }

  // One shot at creating a user within a transaction, after existence checks are done.
  private async createUserTxn(txn: Transaction, newuser: schema.NewUserInfo) {
    // Allocate a new EUID within a transaction and claim it for this new user.
    const newEuid = 'E' + `${Math.floor(Math.random() * 99999)}`.padStart(5, '0');
    const path = schema.userPath(newEuid);
    const doc = this.firestore.doc(path);
    const result = await txn.get(doc);
    if (result.exists) {
      throw new Error(`retry: EUID in use: ${newEuid}`);
    }

    // This EUID is unused, create a full user record
    const info: schema.EUserInfo = {
      euid: newEuid,
      email: newuser.email,
      name: newuser.name,
      language: newuser.language,
      tags: newuser.tags,
      consents: [],
      notes: newuser.notes,
      createTimestamp: Date.now(),
      signupTimestamp: newuser.signupTimestamp,
      demographics: newuser.demographics,
      // These counters are denormalized by the mutation APIs elsewhere
      numRecordings: 0,
      lastRecordingTimestamp: 0,
      numTasks: 0,
      numCompletedTasks: 0,
      numAssignmentsByTaskSet: []
    };

    const fsdata: schema.EUserData = {
      euid: newEuid,
      fbuid: newuser.fbuid,  // this will be unset for admin-created users
      normalizedEmail: normalizeEmail(newuser.email),
      info: JSON.stringify(info)
    };

    txn.set(doc, fsdata);
    return new EUser(this, path, fsdata);
  }

  // Writes audio to GCS for the given user, and creates a JSON as well as a Firestore record.
  async createRecording(user: EUser, task: schema.EUserTaskInfo, localDate: string,
      tzOffset: number, audioData: Buffer): Promise<[EUser, EUserTask, ERecording]> {
    const euid = user.euid;
    const taskId = task.id;
    const timestamp = Date.now();
    const basename = `${localDate}_${timestamp}`;
    const metadata: schema.ERecordingMetadata = {
      euid,
      name: basename,
      platform: 'audiotoolv1',
      transcript: task.task.prompt,
      timestamp,
      localDate,
      utcOffset: tzOffset,
      consents: user.info.consents,
      fileSize: audioData.length
    };

    // Store the recording in GCS
    const bucket = this.storage.bucket(firebaseconfig.BUCKET);
    const dirname = `${firebaseconfig.RECORDING_PATH}/${euid}`;
    await bucket.file(`${dirname}/${basename}.wav`).save(audioData);
    await bucket.file(`${dirname}/${basename}.json`).save(JSON.stringify(metadata, null, 2));

    // Load the taskset outside of the transaction so we don't contend on it
    const taskSet = await this.requireTaskSet(task.taskSetId);

    // Also put a record in Firestore so the GUI can easily query, with updated user and task counters.
    return await this.firestore.runTransaction(async txn => {
      // Reload the user and task within the transaction to get the freshest versions.
      const user = await this.loadUser(euid, txn);
      const usertask = await user.loadTask(txn, taskId);
      const tstask = await taskSet.loadTask(txn, usertask.info.task.id);

      // Save the recording
      const path = schema.recordingPath(euid, timestamp);
      const recordingDoc = this.firestore.doc(path);
      const fsdata: schema.ERecordingData = {
        metadata: JSON.stringify(metadata)
      };
      txn.set(recordingDoc, fsdata);

      // Note that this task is now recorded, and when.
      // TODO: deal with re-recordings somehow
      const prevTimestamp = usertask.info.recordedTimestamp;
      usertask.info.recordedTimestamp = timestamp;
      usertask.update(txn);

      // Update the user's recording and task counters
      user.info.numRecordings = await this.countUserRecordings(user.euid) + 1;
      user.info.lastRecordingTimestamp = timestamp;
      if (prevTimestamp === 0) {
        user.info.numCompletedTasks += 1;  // Don't do this for re-records
      }
      user.update(txn);

      // Update the global counter for this task
      tstask.info.numRecordings += 1;
      tstask.update(txn);

      // Success! Return the user, task, and recording DAOs
      return [user, usertask, new ERecording(user, path, fsdata)];
    });
  }

  // Returns the two GCS File objects for a recording and its metadata, throws an error if not found.
  findRecordingFiles(euid: string, basename: string): [File, File] {
    const bucket = this.storage.bucket(firebaseconfig.BUCKET);
    const wpath = `${firebaseconfig.RECORDING_PATH}/${euid}/${basename}.wav`;
    const jpath = `${firebaseconfig.RECORDING_PATH}/${euid}/${basename}.json`;
    const wfile = bucket.file(wpath);
    const jfile = bucket.file(jpath);
    if (!wfile || !jfile) {
      throw new NotFoundError(`No such recording: ${basename}`);
    }
    return [wfile, jfile];
  }

  // Queries the user's recordings to count how many there are.
  private async countUserRecordings(euid: string): Promise<number> {
    const data = await this.getRecordingsSubcollection(euid).get();
    return data.size;
  }

  // Loads a taskSet by ID, which should be unique.
  async loadTaskSet(id: string, opt_txn?: Transaction): Promise<ETaskSet|undefined> {
    const path = schema.taskSetPath(id);
    const doc = this.firestore.doc(path);
    const existingData = opt_txn ? await opt_txn.get(doc) : await doc.get();
    if (existingData.exists) {
      return new ETaskSet(this, path, existingData.data() as schema.ETaskSetData);
    } else {
      return undefined;
    }
  }

  // Same as above, but fails if the taskSet is missing.
  async requireTaskSet(id: string, opt_txn?: Transaction): Promise<ETaskSet> {
    const ts = await this.loadTaskSet(id, opt_txn);
    if (!ts) {
      throw new NotFoundError(`No such TaskSet: ${id}`);
    }
    return ts;
  }

  // Loads all TaskSets.
  async listTaskSets() : Promise<ETaskSet[]> {
    const data = await this.getTaskSetsCollection().get();
    return data.docs.map(doc => new ETaskSet(this, doc.ref.path, doc.data() as schema.ETaskSetData));
  }

  // Creates a new TaskSet
  async createTaskSet(id: string, name: string, language: string) {
    return await this.run(async txn => {
      let taskSet = await this.loadTaskSet(id, txn);
      if (taskSet) {
        throw new Error(`TaskSet with this id already exists: ${id}`);
      }
      const path = schema.taskSetPath(id);
      const doc = this.firestore.doc(path);
      const info: schema.ETaskSetInfo = {
        id,
        name,
        creationTimestamp: Date.now(),
        language,
        rules: [],
        numAssignedTasks: 0,
        numAssignedUsers: 0
      };
      const fsdata: schema.ETaskSetData = {info: JSON.stringify(info)};
      await txn.set(doc, fsdata);
      return new ETaskSet(this, path, fsdata);
    });
  }

  // Loads all of the Assignment Rules that match a particular user, returns [taskSetId, rule] tuples.
  async loadAssignmentRules(user: EUser): Promise<[ETaskSet, schema.EAssignmentRule][]> {
    const userTags: Set<string> = new Set(user.info.tags);
    const userLanguage: string = user.info.language;

    // Rules have to match the language and one of the user's tags.
    const result: [ETaskSet, schema.EAssignmentRule][] = [];
    for (const taskSet of await this.listTaskSets()) {
      if (taskSet.info.language !== userLanguage) {
        continue;  // This rule's language doesn't match the user
      }
      for (const rule of taskSet.info.rules) {
        if (rule.tags.length > 0) {
          let tagMatch = false;
          for (const tag of rule.tags) {
            if (userTags.has(tag)) {
              tagMatch = true;
              break;
            }
          }
          if (!tagMatch) {
            continue;  // This rule has no tags in common with the user, skip it
          }
        }
        result.push([taskSet, rule]);  // This rule matches
      }
    }

    // Order the rules
    result.sort((a, b) => a[1].order < b[1].order ? -1 : (a[1].order === b[1].order ? 0 : 1));
    return result;
  }

  // Loads a consent by ID, which should be unique.
  async loadConsent(id: string, opt_txn?: Transaction): Promise<EConsent|undefined> {
    const path = schema.consentPath(id);
    const doc = this.firestore.doc(path);
    const existingData = opt_txn ? await opt_txn.get(doc) : await doc.get();
    if (existingData.exists) {
      return new EConsent(this, path, existingData.data() as schema.EConsentData);
    } else {
      return undefined;
    }
  }

  // Same as above, but fails if the consent is missing.
  async requireConsent(id: string, opt_txn?: Transaction): Promise<EConsent> {
    const consent = await this.loadConsent(id, opt_txn);
    if (!consent) {
      throw new NotFoundError(`No such Consent: ${id}`);
    }
    return consent;
  }

  // Loads all Consents.
  async listConsents() : Promise<EConsent[]> {
    const data = await this.getConsentsCollection().get();
    return data.docs.map(doc => new EConsent(this, doc.ref.path, doc.data() as schema.EConsentData));
  }

  // Same as above, but returns only the subset of consents that apply to a user with the given language and tags.
  async listApplicableConsents(language: string, tags: string[], now: number) : Promise<EConsent[]> {
    const result: Set<EConsent> = new Set();
    for (const consent of await this.listConsents()) {
      if (!consent.info.active) {
        continue;  // suppress this inactive consent
      }
      if (consent.info.language !== language) {
        continue;  // not applicable to this user
      }
      if (!consent.getLiveVersion(now)) {
        continue;  // this consent is post-dated into the future, not yet relevant
      }
      if (consent.info.tags.length > 0) {
        // A tagged consent means it only applies to certain users
        for (const ctag of consent.info.tags) {
          for (const utag of tags) {
            if (utag === ctag) {
              result.add(consent);
            }
          }
        }
      } else {
        // Consents with no tags are automatically applicable
        result.add(consent);
      }
    }
    return [...result];
  }

  // Creates a new Consent
  async createConsent(id: string, name: string, language: string, tags: string[], optional: boolean) {
    return await this.run(async txn => {
      let consent = await this.loadConsent(id, txn);
      if (consent) {
        throw new Error(`Consent with this id already exists: ${id}`);
      }
      const path = schema.consentPath(id);
      const doc = this.firestore.doc(path);
      const info: schema.EConsentInfo = {
        id,
        name,
        language,
        tags,
        optional,
        active: true,
        creationTimestamp: Date.now(),
        versions: []
      };
      const fsdata: schema.EConsentData = {info: JSON.stringify(info)};
      txn.set(doc, fsdata);
      return new EConsent(this, path, fsdata);
    });
  }

  getConsentFile(consentId: string, version: number): File {
    const bucket = this.storage.bucket(firebaseconfig.BUCKET);
    const dirname = `${firebaseconfig.CONSENT_PATH}`;
    return bucket.file(`${dirname}/${consentId}-${version}.html`);
  }
}

// DAO for one logged in user of the system.
export class EUser {
  parent: EStorage;
  path: string;  // Firestore document path

  euid: string;  // immutable ID
  fbuid?: string;  // set when account is claimed
  normalizedEmail: string;  // indexed version of email
  info: schema.EUserInfo;

  constructor(parent: EStorage, path: string, fsdata: schema.EUserData) {
    this.parent = parent;  // EStorage system
    this.path = path;  // Firebase document reference path

    this.euid = fsdata.euid;  // Immutable´
    this.fbuid = fsdata.fbuid;  // This can be null for unclaimed accounts
    this.normalizedEmail = fsdata.normalizedEmail;

    // Everything else from the JSON blob: email, name, language, counters, etc
    this.info = JSON.parse(fsdata.info);
  }

  // Returns the number of tasks from the given taskset assigned to this user.
  getNumTasks(taskSetId: string): number {
    for (const [tsid, num] of this.info.numAssignmentsByTaskSet) {
      if (tsid === taskSetId) {
        return num;
      }
    }
    return 0;
  }

  // Adds or removes task counts from the given taskset's counter on this user, and returns the new value.
  changeNumTasks(taskSetId: string, delta: number): number {
    for (const t of this.info.numAssignmentsByTaskSet) {
      if (t[0] === taskSetId) {
        if (t[1] + delta >= 0) {
          t[1] += delta;
          this.info.numTasks += delta;
        } else {
          console.log(`Warning: attempted to decrement counter below zero: ${taskSetId} for ${this.euid}`);
          this.info.numTasks -= t[1];
          t[1] = 0;
        }
        return t[1];
      }
    }

    // Not found, so add a new counter for this taskset
    if (delta > 0) {
      this.info.numAssignmentsByTaskSet.push([taskSetId, delta]);
      this.info.numTasks += delta;
      return delta;
    } else {
      console.log(`Warning: attempted to decrement unassigned taskset: ${taskSetId} for ${this.euid}`);
      return 0;  // we don't allow counters to go below zero
    }
  }

  // Updates this user with any changes carried by this DAO.
  update(txn: Transaction): void {
    txn.update(this.parent.firestore.doc(this.path), {
      // EUID is immutable, never update it
      fbuid: this.fbuid,
      normalizedEmail: this.normalizedEmail,
      info: JSON.stringify(this.info)
    });
  }

  // Returns true if the user's agreements match the live versions of all applicable consents
  async isConsented(now: number): Promise<boolean> {
    for (const c of await this.parent.listApplicableConsents(this.info.language, this.info.tags, now)) {
      if (c.info.optional) {
        continue;  // Permit user not to have consented if the consent is optional
      }
      const v = c.getLiveVersion(now);
      if (!v || !this.isConsented_(c.info.id, v.version)) {
        return false;  // The user doesn't have a current agreement record for this consent
      }
    }
    return true;
  }

  // Returns true if this user has an agreement to the given exact consent and version
  private isConsented_(consentId: string, version: number): boolean {
    for (const agreement of this.info.consents) {
      if (agreement.consentId === consentId && agreement.version === version &&
          agreement.consentTimestamp !== 0 && agreement.revokeTimestamp === 0) {
        return true;  // Found a matching and non-revoked agreement
      }
    }
    return false;
  }

  // Records that the user agreed to a particular consent.
  async addConsent(now: number, agreement: schema.EAgreementInfo): Promise<EUser> {
    return await this.parent.run(async txn => {
      const consent = await this.parent.requireConsent(agreement.consentId, txn);
      let [exact, others] = this.findConsents(agreement.consentId, agreement.version);
      if (exact && exact.revokeTimestamp === 0) {
        // Already consented, just update the timestamps. No change to counters.
        exact.consentTimestamp = now;
        this.update(txn);
        return this;
      }

      // Note the user's new consent and count it, or reinstate a previously revoked consent
      if (exact) {
        exact.consentTimestamp = now;
        exact.revokeTimestamp = 0;  // reinstate
      } else {
        agreement.consentTimestamp = now;
        agreement.revokeTimestamp = 0;
        this.info.consents.push(agreement);
      }
      consent.changeUserCount(agreement.version, 1);

      // Decrement any counters for older versions of the same consent
      for (const oldVersion of others) {
        if (!oldVersion.superseded && !oldVersion.revokeTimestamp) {
          consent.changeUserCount(oldVersion.version, -1);
        }
        oldVersion.superseded = true;
      }

      this.update(txn);
      consent.update(txn);
      return this;
    });
  }

  // Records that the user revoked a consent across all versions
  async revokeConsent(consentId: string, txn: Transaction): Promise<void> {
    const consent = await this.parent.requireConsent(consentId, txn);
    let [, consentRecords] = this.findConsents(consentId, -1);
    for (const c of consentRecords) {
      if (c.consentTimestamp && !c.revokeTimestamp) {
        consent.changeUserCount(c.version, -1);
      }
      c.revokeTimestamp = Date.now();
    }

    this.update(txn);
    consent.update(txn);
  }

  // Returns the matching consent, plus any other consents of different versions with the same ID.
  private findConsents(consentId: string, version: number): [schema.EAgreementInfo|undefined, schema.EAgreementInfo[]] {
    let exact: schema.EAgreementInfo|undefined;  // ID and version match
    const others: schema.EAgreementInfo[] = [];  // only IDs match
    for (const c of this.info.consents) {
      if (c.consentId === consentId) {
        if (c.version === version) {
          if (exact) {
            throw new Error(`User ${this.info.euid} has multiple exact consent matches: ${consentId}-${version}`);
          }
          exact = c;
        } else {
          others.push(c);
        }
      }
    }
    return [exact, others];
  }

  // Returns the user's tasks, if any
  async listTasks(): Promise<EUserTask[]> {
    const data = await this.parent.getUserTasksSubcollection(this.euid).orderBy('order').get();
    return data.docs.map(doc => new EUserTask(this, doc.ref.path, doc.data() as schema.EUserTaskData));
  }

  // Returns the user's recordings, if any
  async listRecordings(): Promise<ERecording[]> {
    const data = await this.parent.getRecordingsSubcollection(this.euid).get();
    return data.docs.map(doc => new ERecording(this, doc.ref.path, doc.data() as schema.ERecordingData));
  }

  // Loads one UserTask using a transaction, returns null if not found
  async loadTask(txn: Transaction, taskId: string): Promise<EUserTask> {
    const path = schema.userTaskPath(this.euid, taskId);
    const existingTaskData = await txn.get(this.parent.firestore.doc(path));
    if (existingTaskData.exists) {
      return new EUserTask(this, path, existingTaskData.data() as schema.EUserTaskData);
    } else {
      throw new NotFoundError(`No such task: ${taskId}`);
    }
  }

  // Loads one Recording using a transaction. Throws an error if not found.
  async loadRecording(txn: Transaction, timestamp: number): Promise<ERecording> {
    const path = schema.recordingPath(this.euid, timestamp);
    const data = await txn.get(this.parent.firestore.doc(path));
    if (data.exists) {
      return new ERecording(this, path, data.data() as schema.ERecordingData);
    } else {
      throw new NotFoundError(`Recording not found: ${timestamp}`);
    }
  }

  // Adds the list of tasks to a user and updates the user and TaskSet counters.
  async assignTasks(txn: Transaction, tasks: ETask[], taskSet: ETaskSet): Promise<void> {
    const tsid = taskSet.info.id;
    // Get the currently highest task order number
    const collection = this.parent.getUserTasksSubcollection(this.euid);
    const q = await txn.get(collection.orderBy('order', 'desc').limit(1));
    let order = 0;
    for (const doc of q.docs) {
      order = doc.data().order;
      break;
    }
    order += 1;

    // Save these new tasks
    const timestamp = Date.now();
    for (const task of tasks) {
      const newDoc = collection.doc();
      const info: schema.EUserTaskInfo = {
        id: newDoc.id,
        taskSetId: tsid,
        task: task.info,
        assignedTimestamp: timestamp,
        recordedTimestamp: 0
      };
      const fsdata: schema.EUserTaskData = {
        order: order++,
        info: JSON.stringify(info)};
      txn.set(newDoc, fsdata);
    }

    // Update the user's task counters and the taskset's master counter
    const oldNum = this.getNumTasks(tsid);
    const newNum = this.changeNumTasks(tsid, tasks.length);
    taskSet.info.numAssignedTasks += tasks.length;
    if (oldNum === 0 && newNum > 0) {
      taskSet.info.numAssignedUsers++;  // this user didn't have tasks from this taskset before
    }
    taskSet.update(txn);
    this.update(txn);
  }

  // Removes the list of tasks from a user and updates the user's task counters.
  async removeTasks(txn: Transaction, idTuples: [string, string][]): Promise<ETaskSet[]> {
    // First load all involved tasksets so we can update their counters.
    const tasksByParent = await this.loadTaskTuples(txn, idTuples);

    // Update counters on user and taskset to reflect task changes
    for (const [taskSet, taskIds] of tasksByParent) {
      taskSet.info.numAssignedTasks -= taskIds.length;
      const oldNum = this.getNumTasks(taskSet.info.id);
      const newNum = this.changeNumTasks(taskSet.info.id, -taskIds.length);
      if (oldNum > 0 && newNum <= 0) {
        // This user has no tasks left from this taskset, so they drop out of the user counter
        taskSet.info.numAssignedUsers = Math.max(0, taskSet.info.numAssignedUsers - 1);
      }
    }

    // Remove these tasks; the client was supposed to have already checked if they're unrecorded
    for (const [, taskId] of idTuples) {
      const taskpath = schema.userTaskPath(this.euid, taskId);
      txn.delete(this.parent.firestore.doc(taskpath));
    }

    // Update the user's task counters
    this.update(txn);

    // Update all the involved TaskSets we touched to save their counters
    const result = [...tasksByParent.keys()];
    for (const taskSet of result) {
      taskSet.update(txn);
    }
    return result;
  }

  // For each [taskSetId, taskId] tuple, loads the parent TaskSet and organizes all its taskIds in a map.
  private async loadTaskTuples(txn: Transaction, idTuples: Array<[string, string]>): Promise<Map<ETaskSet, string[]>> {
    const taskSets = new Map();
    const result = new Map();
    for (const [taskSetId, taskId] of idTuples) {
      let taskSet = taskSets.get(taskSetId);
      if (!taskSet) {
        taskSet = await this.parent.requireTaskSet(taskSetId, txn);
        result.set(taskSet, []);
        taskSets.set(taskSetId, taskSet);
      }
      result.get(taskSet)!.push(taskId);
    }
    return result;
  }
}

// DAO for one task assigned to a user
export class EUserTask {
  parent: EUser;
  path: string;  // Firestore document path
  order: number;
  info: schema.EUserTaskInfo;

  constructor(parent: EUser, path: string, fsdata: schema.EUserTaskData) {
    this.parent = parent;
    this.path = path;
    this.order = fsdata.order;
    this.info = JSON.parse(fsdata.info);
  }

  // Updates this UserTask with any changes carried by this DAO.
  update(txn: Transaction) {
    txn.update(this.parent.parent.firestore.doc(this.path), {
      // Never mutate order
      info: JSON.stringify(this.info)
    });
  }
}

// DAO for one recording clip
export class ERecording {
  parent: EUser;
  path: string;  // Firestore document path
  metadata: schema.ERecordingMetadata;

  constructor(parent: EUser, path: string, fsdata: schema.ERecordingData) {
    this.parent = parent;
    this.path = path;
    this.metadata = JSON.parse(fsdata.metadata);
  }

  async delete(user: EUser, usertask: EUserTask, tsTask: ETask, txn: Transaction): Promise<void> {
    if (user !== this.parent || usertask.info.recordedTimestamp !== this.metadata.timestamp) {
      throw new Error(`Unexpected wrong user/task update: ${user.euid}: ${this.metadata.timestamp}`);
    }
    // The user's recording and task count should decline by one
    this.parent.info.numCompletedTasks = Math.max(0, this.parent.info.numCompletedTasks - 1);
    this.parent.info.numRecordings = Math.max(0, this.parent.info.numRecordings - 1);
    this.parent.update(txn);

    // The master task counter should decline by one
    tsTask.info.numRecordings = Math.max(0, tsTask.info.numRecordings - 1);
    tsTask.update(txn);

    // Remove the recording mark from this user task
    usertask.info.recordedTimestamp = 0;
    usertask.update(txn);

    // Delete the recording itself
    txn.delete(this.parent.parent.firestore.doc(this.path));
  }
}

// DAO for one set of tasks
export class ETaskSet {
  parent: EStorage;
  path: string;  // Firestore document path
  info: schema.ETaskSetInfo;

  constructor(parent: EStorage, path: string, fsdata: schema.ETaskSetData) {
    this.parent = parent;  // EStorage system
    this.path = path;
    this.info = JSON.parse(fsdata.info);
  }

  // Returns all of this TaskSet's tasks.
  async listTasks(): Promise<ETask[]> {
    const data = await this.parent.getTasksSubcollection(this.info.id).orderBy('order').get();
    return data.docs.map(doc => new ETask(this, doc.ref.path, doc.data() as schema.ETaskData));
  }

  // Reads one task via a transaction.
  async loadTask(txn: Transaction, taskId: string): Promise<ETask> {
    const path = schema.taskPath(this.info.id, taskId);
    const existingTaskData = await txn.get(this.parent.firestore.doc(path));
    if (existingTaskData.exists) {
      return new ETask(this, path, existingTaskData.data() as schema.ETaskData);
    } else {
      throw new NotFoundError(`No such task: ${this.info.id}/${taskId}`);
    }
  }

  // Returns just the tasks matching the given IDs, in TaskSet order.
  async selectTasks(taskIds: string[]): Promise<ETask[]> {
    function ordered(tasks: ETask[]): ETask[] {
      const a = [...tasks];
      a.sort((x, y) => x.info.order - y.info.order);
      return a;
    }

    if (taskIds.length <= 10) {
      // Firestore IN clauses only support 10 terms
      const q = this.parent.getTasksSubcollection(this.info.id).where(FieldPath.documentId(), 'in', taskIds);
      const data = await q.get();
      return ordered(data.docs.map(doc => new ETask(this, doc.ref.path, doc.data() as schema.ETaskData)));

    } else {
      // Scan the whole collection, assuming this is more efficient than many lookups.
      const set = new Set(taskIds);
      const result: ETask[] = [];
      const data = await this.parent.getTasksSubcollection(this.info.id).get();
      data.docs.map(doc => {
        if (set.has(doc.id)) {
          result.push(new ETask(this, doc.ref.path, doc.data() as schema.ETaskData));
        }
      });
      return ordered(result);
    }
  }

  // Returns a randomly selected subset of this set's Tasks.
  async sampleTasks(sampleSize: number): Promise<ETask[]> {
    const data = await this.parent.getTasksSubcollection(this.info.id).get();
    const docs = [...data.docs];
    shuffle(docs);
    if (sampleSize < docs.length) {
      docs.splice(sampleSize, docs.length - sampleSize);  // erase the later elements
    }
    return docs.map(doc => new ETask(this, doc.ref.path, doc.data() as schema.ETaskData));
  }

  // Adds or removes TaskSet rules in memory; be sure to update(txn) after this.
  changeRules(addrules: schema.EAssignmentRule[], delrules: number[]): void {
    if (addrules.length === 0 && delrules.length === 0) {
      throw new ParamError('No rule changes specified');
    }

    // Splice out unwanted rules from the list
    const rules = this.info.rules;
    for (const rule of rules) {
      if (delrules.indexOf(rule.id) !== -1) {
        rules.splice(rules.indexOf(rule), 1);
      }
    }

    // Add any desired new rules to the list
    for (const rule of addrules) {
      rules.push(rule);
    }
  }

  // Commits changes to TaskSet properties
  async update(txn: Transaction) {
    const info = JSON.stringify(this.info);
    txn.update(this.parent.firestore.doc(this.path), {info});
  }

  // Tries to create new unique prompts. Duplicate prompts are prohibited.
  async addPromptTasks(tasks: Array<[number, string]>): Promise<ETask[]> {
    const tasksSubcollection = this.parent.getTasksSubcollection(this.info.id);
    for (const [order, prompt] of tasks) {
      if (!prompt || !order || isNaN(order)) {
        throw new ParamError(`Missing required fields: ${order}:${prompt}`);
      }
    }

    const results: ETask[] = [];
    let pos = 0;
    while (pos < tasks.length) {
      const r = await this.parent.firestore.runTransaction(async txn => {
        const result: ETask[] = [];
        for (let i = pos; i < tasks.length && i < pos + firebaseconfig.MAX_TASK_BATCH_SIZE; i++) {
          // TODO: prevent duplicate prompts
          const [order, prompt] = tasks[i];
          const newDoc = tasksSubcollection.doc();
          const info: schema.ETaskInfo = {
            id: newDoc.id,
            order,
            taskType: 'prompt',
            prompt,
            creationTimestamp: Date.now(),
            numRecordings: 0
          };
          const fsdata: schema.ETaskData = {order, info: JSON.stringify(info)};
          txn.set(newDoc, fsdata);
          result.push(new ETask(this, newDoc.path, fsdata));
        }
        return result;
      });
      pos += r.length;
      results.push.apply(results, r);
    }
    return results;
  }

  // Assigns a selection of tasks from this task set to one user
  async assignTasks(spec: schema.EAssignmentRule, euid: string): Promise<EUser> {
    // Load the selected tasks matched by the rule
    let tasks: ETask[];
    if (spec.allTasks) {
      tasks = await this.listTasks();
    } else if (spec.taskIds.length > 0) {
      tasks = await this.selectTasks(spec.taskIds);
    } else if (spec.sample > 0) {
      tasks = await this.sampleTasks(spec.sample);
    } else {
      throw new ParamError('Malformed selection rule');
    }

    if (tasks.length === 0) {
      throw new NotFoundError('No tasks to assign');
    }

    // Write the tasks to the user in a transaction
    const [u, t]: [EUser, ETaskSet] = await this.parent.run(async txn => {
      const ts = await this.parent.requireTaskSet(this.info.id, txn);  // transactionally reload
      const user = await this.parent.loadUser(euid, txn);
      await user.assignTasks(txn, tasks, ts);
      return [user, ts];
    });

    // We have changed, so we can update ourselves with the transactional copy of the taskset
    this.info = t.info;

    return u;
  }
}

// DAO for one Task on a TaskSet
export class ETask {
  parent: ETaskSet;
  path: string;  // Forestore document path
  info: schema.ETaskInfo;

  constructor(parent: ETaskSet, path: string, fsdata: schema.ETaskData) {
    this.parent = parent;
    this.path = path;
    this.info = JSON.parse(fsdata.info);
  }

  // Updates this Task with any changes carried by this DAO, such as counter changes.
  update(txn: Transaction) {
    txn.update(this.parent.parent.firestore.doc(this.path), {
      info: JSON.stringify(this.info)
    });
  }
}

// DAO for one Consent
export class EConsent {
  parent: EStorage;
  path: string;  // Firestore document path
  info: schema.EConsentInfo;

  constructor(parent: EStorage, path: string, fsdata: schema.EConsentData) {
    this.parent = parent;  // EStorage system
    this.path = path;
    this.info = JSON.parse(fsdata.info);
  }

  // Returns a variation of the contained consent info that has only the live version and no others.
  infoWithOnlyLiveVersion(now: number): schema.EConsentInfo {
    const live = this.getLiveVersion(now)!;
    const info = clone(this.info);
    info.versions = [clone(live)];
    return info;
  }

  // Returns the latest live version, unless no version is live yet.
  getLiveVersion(now: number): schema.EConsentVersion|undefined {
    let latest: schema.EConsentVersion|undefined;
    for (const version of this.info.versions) {
      if (version.liveTimestamp <= now && (!latest || latest.version < version.version)) {
        latest = version;
      }
    }
    return latest;
  }

  // Returns the array index of the given consent version, or -1 if not found.
  getVersionIndex(version: number) {
    for (let i = 0; i < this.info.versions.length; i++) {
      if (this.info.versions[i].version === version) {
        return i;
      }
    }
    return -1;
  }

  // Changes the per-user counters on a particular consent version in the consent info.
  changeUserCount(version: number, incr: number) {
    const idx = this.getVersionIndex(version);
    if (idx === -1) {
      throw new NotFoundError(`No such consent version: ${this.info.id}-${version}`);
    }
    this.info.versions[idx].numUsers += incr;
  }

  // Adds a new version, stores the text in GCS, and commits it
  async createVersion(description: string, liveTimestamp: number, contents: Buffer, txn: Transaction): Promise<void> {
    // Find the lowest unused version number
    const version = this.info.versions.reduce((n, v) => Math.max(n, v.version), 0) + 1;
    
    // Store the consent text; these are immutable
    await this.parent.getConsentFile(this.info.id, version).save(contents);

    // Once the contents are written, add the metadata
    this.info.versions.push({
      version, liveTimestamp, description,
      creationTimestamp: Date.now(),
      numUsers: 0
    });
    this.update(txn);
  }

  // Deletes a version and commits the transaction.
  async deleteVersion(version: number, txn: Transaction): Promise<void> {
    const idx = this.getVersionIndex(version);
    if (idx === -1) {
      throw new NotFoundError(`No such consent version: ${this.info.id}-${version}`);
    }

    const versionData = this.info.versions[idx];
    if (versionData.numUsers > 0) {
      throw new ParamError(`Consent version is in use and cannot be removed: ${this.info.id}-${version}`);
    }
    this.info.versions.splice(idx, 1);
    this.update(txn);

    // Also clean up the GCS file since it was never used
    await this.parent.getConsentFile(this.info.id, version).delete();
  }

  // Commits changes to Consent properties. Don't use this for version creation or deletion.
  update(txn: Transaction) {
    const info = JSON.stringify(this.info);
    txn.update(this.parent.firestore.doc(this.path), {info});
  }
}
