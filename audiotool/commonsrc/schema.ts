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

// Just the type definitions for the schema we store and transmit.

export const MAX_DELETABLE_RECORDING_AGE_MS = 24 * 3600 * 1000;  // 24 hours

// Supported languages
export const SUPPORTED_LANGUAGES = new Set([
  'en-US', 'en-GB', 'fr-FR', 'es-ES', 'hi-HI', 'ja-JP'
]);

// Paths of documents, collections, and sub-collections
export const USERS_TABLE = 'EUsers';
export const TASKS_SUBCOLLECTION = 'tasks';
export const RECORDINGS_TABLE = 'ERecordings';
export const RECORDINGS_SUBCOLLECTION = 'recordings';
export const TASKSETS_TABLE = 'ETaskSets';
export const CONSENTS_TABLE = 'EConsents';

export function userPath(euid: string): string {
  return `${USERS_TABLE}/${euid}`;
}

export function userTaskPath(euid: string, taskId: string): string {
  return `${USERS_TABLE}/${euid}/${TASKS_SUBCOLLECTION}/${taskId}`;
}

export function recordingPath(euid: string, timestamp: number): string {
  const tsid = `${timestamp}`.padStart(20, '0');
  return `${RECORDINGS_TABLE}/${euid}/${RECORDINGS_SUBCOLLECTION}/${tsid}`;
}

export function taskSetPath(tsid: string): string {
  return `${TASKSETS_TABLE}/${tsid}`;
}

export function taskPath(tsid: string, taskId: string): string {
  return `${TASKSETS_TABLE}/${tsid}/${TASKS_SUBCOLLECTION}/${taskId}`;
}

export function consentPath(cid: string): string {
  return `${CONSENTS_TABLE}/${cid}`;
}

// Each EUser
export interface EUserData {
  euid: string;
  fbuid?: string;  // this won't be set until the user claims their row
  normalizedEmail: string;
  info: string;  // JSON of EUserInfo, see below
}

// The expanded JSON of EUser.info
export interface EUserInfo {
  euid: string;
  email: string;
  name: string;  // set by admin, or from the interest form during signup
  fbname?: string;  // this won't be set until the user claims their row
  language: string;
  tags: string[];
  consents: EAgreementInfo[];
  notes: string;
  numRecordings: number;
  lastRecordingTimestamp: number;
  demographics?: UserDemographics;
  numTasks: number;
  numCompletedTasks: number;
  createTimestamp: number;
  signupTimestamp: number;
  numAssignmentsByTaskSet: Array<[taskSetId: string, numAssignments: number]>;
}

// Structured storage of interest form reply
export interface UserDemographics {
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  accent?: string;
  referral?: string;
  gender?: string;  // one of "male", "female", "undisclosed", "", or any other text for "other"
  race?: string;
  accessDevices?: string[];  // each entry is one of "computer", "androidphone", "iphone", "none", or any "other" string

  hasHelper?: boolean;
  helperName?: string;
  helperEmail?: string;
  helperRelationship?: string;
  consentStorage?: boolean;
  consentInitials?: string;
  acceptTos?: boolean;
  otherInfo?: string;
}

// Never stored, but these are the typical subset of parameters for a new user
export interface NewUserInfo {
  email: string;  // This must match Firebase signin, for security
  name: string;
  language: string;
  tags: string[];
  signupTimestamp: number;
  notes: string;
  demographics?: UserDemographics;

  // these may not be set yet for admin-created users
  fbuid?: string;
  fbname?: string;
}

// Each ERecording
export interface ERecordingData {
  metadata: string;  // JSON of ERecordingMetadata, see below
}

// The expanded JSON of ERecording.metadata
export interface ERecordingMetadata {
  euid: string;  // Owning user EUID; not needed in Firestore but important for GCS/metadata.json
  name: string;  // basename of file on GCS
  platform: string;  // hard coded for audiotool
  project: string;  // the taskset ID
  task: string;  // the task ID
  transcript: string;  // a prompt of what was said
  timestamp: number;  // The server time of the recording; also the doc.id
  localDate: string;  // A string of the browser time
  utcOffset: number;  // The numeric time zone offset from the browser
  fileSize: number;  // The size of the .wav file on GCS
  mimeType: string;  // The MIME type configured during recording, with optional "; codec=blah" extension
  consents: EAgreementInfo[];  // The user's consents at the time of recording
  language: string;  // The language locale of the task, since the user's language could change after this
  deviceInfo?: EDeviceInfo;  // The parsed user agent string, if any
}

// Each EUserTask, which is the assignment of an ETask to an EUser
export interface EUserTaskData {
  order: number;
  info: string;  // JSON of EUserTaskInfo, see below
}

// The expanded JSON of EUserTask.info
export interface EUserTaskInfo {
  id: string;  // Firestore generated UUID for this UserTask
  taskSetId: string;
  task: ETaskInfo;
  assignedTimestamp: number;
  recordedTimestamp: number;  // This is both when they completed it and the exact timestamp of the resultant recording, or 0
}

// A consent from the user
export interface EAgreementInfo {
  consentId: string;
  version: number;
  consentTimestamp: number;  // This is equal to the signup time for first consent(s)
  revokeTimestamp: number;  // Only set if the user revoked this consent later, otherwise 0
  superseded?: boolean;  // When set, indicates that the user consented to a newer version later
  sigText?: string;  // a textual mark such as name or initials that may be collected with the agreement
}

// Each ETaskSet
export interface ETaskSetData {
  info: string;  // JSON of ETaskSetInfo, see below
}

// The expanded JSON of ETaskSet.info
export interface ETaskSetInfo {
  id: string;  // a semi-readable ID like "euphonia-2022-en"
  name: string;  // a human-readable description, freeform
  creationTimestamp: number;
  language: string;
  rules: EAssignmentRule[];
  numAssignedTasks: number;  // total of all UserTasks in this taskset across all users, so 50 tasks x 100 users = 5000
  numAssignedUsers: number;  // users with at least one task from this taskset
}

// An enrollment rule
export interface EAssignmentRule {
  id: number;  // A rule ID that is local to this TaskSet
  order: number;  // Global assignment priority, determines run order for each user
  tags: string[];  // When tags are present, any user with one or more of these gets this rule run on them
  allTasks: boolean;  // When true, assigns all tasks from the parent TaskSet
  taskIds: string[];  // If non-empty, lists specific tasks to assign, in this order
  sample: number;  // When non-zero, randomly assigns this many tasks to the user, in the order in which they are in the taskset
}

// Each ETask, which is part of a TaskSet
export interface ETaskData {
  order: number;  // Used to load tasks in desired assignment order
  info: string;  // JSON of ETaskInfo, see below
}

// The expanded JSON of ETask.info
export interface ETaskInfo {
  id: string;  // Firestore generated UUID
  order: number;
  taskType: string;
  creationTimestamp: number;
  prompt: string;  // For taskType=Prompt
  numRecordings: number;  // number of recordings of this task that have been completed and not deleted
}

// Each EConsent, which models one of the system's consent documents
export interface EConsentData {
  info: string;  // a JSON of EConsentInfo, see below
}

export interface EConsentInfo {
  id: string;  // a semi-readable ID like "euphonia-2022-en"
  name: string;  // a human-readable description, freeform
  creationTimestamp: number;
  optional: boolean;  // When set, the consent isn't required for recording
  active: boolean;  // When false, the consent is never presented to users
  language: string;  // Users with this language and tags will see this consent
  tags: string[];  // Tagless consents match every user. Otherwise a user with at least one of these tags will see this consent.
  versions: EConsentVersion[];  // List of the versions of this consent, in order.
}

export interface EConsentVersion {
  version: number;  // Which number consent this is. Ever increasing and unique within this consent ID.
  description: string;
  creationTimestamp: number;
  liveTimestamp: number;  // When this version becomes the active consent and supercedes lower versions
  numUsers: number;  // counter for the number of users who consented to this version. Superseding versions detract from this number!
}

// A GUI string localized to a particular language.
export interface ELocaleString {
  key: string;  // The key for this string, which is usually the english version
  text: string;  // The translation in the local language
  description: string;  // Documentation for the string, for localizers. This is never displayed.
  en?: string;  // Example of the desired string in US English, if different from the key.
}

// This is the struct produced by useragent.parse().toJSON()
export interface EDeviceInfo {
  family?: string;
  major?: string;
  minor?: string;
  patch?: string;
  device?: {
    family?: string;
    major?: string;
    minor?: string;
    patch?: string;
  };
  os?: {
    family?: string;
    major?: string;
    minor?: string;
    patch?: string;
  };
}
