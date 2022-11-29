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

// This comes from the global firebase imports.
declare const firebase: any;

// We extend JQuery with a few utilities, see util.ts
interface JQuery {
  eadd(spec: string): JQuery<HTMLElement>;
  eins(spec: string): JQuery<HTMLElement>;
  eshow(wanted: boolean): void;
  evisible(wanted: boolean): void;
  eenable(wanted: boolean): void;
  eclass(cname: string|undefined, wanted: boolean): void;
  efade(wanted: boolean): void;
  eaddtr(cellNodes: Array<JQuery<HTMLElement>>, rowClass?: string): Array<JQuery<HTMLElement>>;
  etext(cellText: string): JQuery<HTMLElement>;
  evalue(inputValue: string): JQuery<HTMLElement>;
}

// The object we get from onAuthStateChanged;
// see https://firebase.google.com/docs/reference/js/v8/firebase.User
interface FBUser {
  uid: string;
  email: string;
  displayName: string;
}
