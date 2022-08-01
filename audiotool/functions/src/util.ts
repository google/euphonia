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

import { normalizeTag } from '../../commonsrc/util';
import * as schema from '../../commonsrc/schema';

// Parses a normalized array of tags from the given JSON-encoded string.
export function parseTagsJSON(json: string): string[]|undefined {
  const obj: string[] = JSON.parse(json);
  if (!(obj instanceof Array)) {
    return undefined;  // could not parse
  }
  return [...obj.filter(tag => tag ? tag.trim() != '' : false).map(tag => normalizeTag(tag))];
}

// Returns the normalized version of the given email address
export function normalizeEmail(email: string) {
  email = email.trim().toLowerCase();

  const sep = email.indexOf('@');
  const name = email.slice(0,sep).replace(/\+.*$/ig, '').replace(/\./g, '');

  let domain = email.slice(sep + 1);
  if (domain == 'googlemail.com') {
    domain = 'gmail.com';
  }

  return `${name}@${domain}`;
}

// Returns the given value, or fails if it is undefined.
export function requireParam<X>(value: X|undefined): X {
  if (value == undefined) {
    throw new ParamError('Missing required fields');
  }
  return value;
}

// Returns the given array value, or fails if it is undefined or missing items.
export function requireArray<X>(value: X[]|undefined, minLength: number = 0): X[] {
  if (!value) {
    throw new ParamError('Missing required fields');
  }
  if (value.length < minLength) {
    throw new ParamError('Missing required array fields');
  }
  return value;
}

// Returns an integer number, failing if it doesn't parse.
export function requireInt(intText: string|undefined): number {
  if (!intText) {
    throw new ParamError('Missing required field');
  }
  const num = parseInt(intText);
  if (isNaN(num)) {
    throw new ParamError(`Not a number: ${intText}`);
  }
  return num;
}

// Returns a language code, failing if it's not a supported language
export function requireLanguage(language: string|undefined): string {
  if (!language) {
    throw new ParamError('Missing required language');
  }
  if (!schema.SUPPORTED_LANGUAGES.has(language)) {
    throw new ParamError(`Unsupported language: ${language}`);
  }
  return language;
}

// Parses a UTF8-encoded text file of prompts, returning an array of task/order tuples. TODO: csv and other task types
export function parseTasksFile(file: Buffer, format: string, orderStart: number): [number, string][] {
  if (format != 'txt') {
    // TODO: support other task file formats
    throw new Error(`Unsupported task file format: ${format}`);
  }
  if (orderStart < 1) {
    throw new Error(`Unsupported order start: ${orderStart}`);
  }

  // Parse the input file as a UTF8-encoded list of strings, one per line
  const lines = file.toString('utf8').split(/\n+/);

  let order = orderStart;
  const result: [number, string][] = [];
  for (let line of lines) {
    line = line ? line.trim() : '';
    if (!line) {
      continue;  // Skip blank lines
    }
    result.push([order++, line]);
  }
  return result;
}

// An error indicating a problem with an HTTP request.
export class HTTPError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

// An error indicating a bad HTTP parameter; results in a 400.
export class ParamError extends HTTPError {
  constructor(message: string, code: number = 400) {
    super(message, code);
  }
}

// An exception indicating an authorization error; results in a 403.
export class AccessError extends HTTPError {
  constructor(message: string, code: number = 403) {
    super(message, code);
  }
}

// An exception indicating a missing resource; results in a 404.
export class NotFoundError extends HTTPError {
  constructor(message: string, code: number = 404) {
    super(message, code);
  }
}
