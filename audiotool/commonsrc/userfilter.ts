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

import {EUserInfo} from './schema';

// Alias for a filter function
export type UserPredicate = (user: EUserInfo) => boolean;

// A simple parser for user filter queries. 
export class UserFilter {
  static parse(text: string): UserPredicate {
    const predicates: Array<UserPredicate> = [];
    for (let token of UserFilter.tokenize(text)) {
      // Allow putting a minus sign in front of any token to negate it
      let isNegated = false;
      if (token.startsWith('-')) {
        isNegated = true;
        token = token.substring(1);
      }

      // Parse the structured predicates; this falls back to text search if there's no other match
      const fn = UserFilter.parseToken(token);
      predicates.push(isNegated ? UserFilter.notFn(fn) : fn);
    }

    return UserFilter.andFn(predicates);
  }

  // Returns a predicate function for the given token; does not handle negation or errors.
  private static parseToken(token: string): UserPredicate {
    if (token.startsWith('tag:')) {
      // Match tags exactly
      const wantTag = token.substring(4);
      return UserFilter.tagFn(wantTag);

    } else if (token.startsWith('taglike:')) {
      // Match tag substrings
      const wantTag = token.substring(8).toLowerCase();
      return UserFilter.tagLikeFn(wantTag);

    } else if (token.startsWith('language:')) {
      // Match language
      const lang = token.substring(9).toLowerCase();
      return UserFilter.languageFn(lang);

    } else if (token.startsWith('lastrecorded:')) {
      // Match users who recorded on or after a given date
      const timestamp = UserFilter.parseDate(token.substring('lastrecorded:'.length));
      return UserFilter.lastRecordedFn(timestamp);

    } else if (token.startsWith('created:')) {
      // Match user records that were created on or after a given date
      const timestamp = UserFilter.parseDate(token.substring('created:'.length));
      return UserFilter.createdFn(timestamp);

    } else if (token.startsWith('recordings:')) {
      // Match users with at least this number of recordings
      const num = parseInt(token.substring('recordings:'.length));
      return UserFilter.recordingsFn(num);

    } else if (token.startsWith('tasks:')) {
      // Match users with at least this number of assigned tasks
      const num = parseInt(token.substring('tasks:'.length));
      return UserFilter.tasksFn(num);

    } else if (token.startsWith('remainingtasks:')) {
      // Match users with at least this number of assigned tasks
      const num = parseInt(token.substring('remainingtasks:'.length));
      return UserFilter.tasksRemainingFn(num);

    } else {
      // Match freeform text
      return UserFilter.textMatchFn(token);
    }
  }

  private static andFn(fns: Array<UserPredicate>): UserPredicate {
    return (user) => {
      for (const fn of fns) {
        if (!fn(user)) {
          return false;
        }
      }
      return true;
    };
  }

  private static notFn(fn: UserPredicate): UserPredicate {
    return user => !fn(user);
  }

  // Returns a predicate that matches users with exactly the given tag.
  private static tagFn(wantTag: string): UserPredicate {
    return user => {
      for (const tag of user.tags) {
        if (tag.indexOf(wantTag) != -1) {
          return true;
        }
      }
      return false;
    };
  }

  // Returns a predicate that matches users with at least one tag similar to the given tag.
  private static tagLikeFn(wantTag: string): UserPredicate {
    return user => {
      for (const tag of user.tags) {
        if (tag.toLowerCase().indexOf(wantTag) != -1) {
          return true;
        }
      }
      return false;
    };
  }

  // Returns a predicate that matches users with the given language.
  private static languageFn(lang: string): UserPredicate {
    lang = lang.toLowerCase();
    return user => !!user.language && user.language.toLowerCase().indexOf(lang) != -1;
  }

  // Returns a predicate that matches users who were created on or after the given timestamp.
  private static createdFn(timestamp: number): UserPredicate {
    return user => timestamp <= user.createTimestamp;
  }

  // Returns a predicate that matches users who last recorded on or after the given timestamp.
  private static lastRecordedFn(timestamp: number): UserPredicate {
    return user => timestamp <= user.lastRecordingTimestamp;
  }

  // Returns a predicate that matches users with at least the given number of recordings.
  private static recordingsFn(num: number): UserPredicate {
    if (isNaN(num)) {
      return x => false;
    }
    return user => num <= (user.numRecordings ? user.numRecordings : 0);
  }

  // Returns a predicate that matches users with at least the given number of tasks.
  private static tasksFn(num: number): UserPredicate {
    if (isNaN(num)) {
      return x => false;
    }
    return user => num <= (user.numTasks ? user.numTasks : 0);
  }

  private static tasksRemainingFn(num: number): UserPredicate {
    if (isNaN(num)) {
      return x => false;
    }
    return user => num <= (user.numTasks - user.numCompletedTasks);
  }

  // Returns a predicate that matches arbitrary text within the user record
  private static textMatchFn(text: string): UserPredicate {
    // This is very silly!
    return user => JSON.stringify(user).toLowerCase().indexOf(text.toLowerCase()) != -1;
  }

  // Parses a timestamp from the given text like "2022/04/05", or returns NaN if it's invalid.
  static parseDate(text: string): number {
    if (!/^[21][0-9][0-9][0-9]\/[0123][0-9]\/[0-9][0-9]$/.test(text)) {
      return Number.NaN;
    }
    const tzOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;
    const parts = text.split('/');
    const timestamp = Date.parse(`${parts[0]}-${parts[1]}-${parts[2]}T00:00:00.000Z`);
    return timestamp + tzOffsetMs;
  }

  // Yields a sequence of space-separated tokens from the given string.
  // Double quotes with backslash escapes can be used to create tokens with spaces.
  static *tokenize(text: string): Generator<string> {
    text = text.replace(/\s/g, ' ').trim();
    let start = 0;
    let pos = 0;
    let inToken = false;
    let inQuote = false;
    const len = text.length;
    while (start < len) {
      const nextQuote = UserFilter.nextPos(text, `"`, pos);
      const nextEscape = UserFilter.nextPos(text, '\\"', pos);
      const nextSpace = UserFilter.nextPos(text, ` `, pos);
      if (inQuote && nextEscape < nextQuote - 1) {
        // Continue the current quote token past the next escaped quote
        pos = nextEscape + 2;

      } else if (inQuote && nextQuote < nextEscape) {
        // This quoted token ends with the next quote
        yield text.substring(start, nextQuote).replace(/\\"/g, `"`);
        start = nextQuote + 1;
        pos = start;
        inToken = false;
        inQuote = false;

      } else if (inToken && nextEscape < nextSpace) {
        // Continue the current plain token past the next escaped quote
        pos = nextEscape + 2;

      } else if (inToken) {
        // This token ends with the next space, or the end of the string
        yield text.substring(start, nextSpace).replace(/\\"/g, `"`);
        start = nextSpace + 1;
        pos = start;
        inToken = false;
        inQuote = false;

      } else if (!inToken && nextQuote < nextSpace && nextQuote < nextEscape) {
        // The next token starts with a quote
        inQuote = true;
        inToken = true;
        start = nextQuote + 1;
        pos = start;

      } else if (!inToken && pos == nextSpace) {
        // Wind past the spaces to the start of the next token
        while (pos < len && text[pos] == ' ') pos++;

      } else {
        // The next token is non-quoted and starts here
        start = pos;
        inToken = true;
      }
    }
  }

  // Like string.indexOf but returns the end position of the string if not found, rather than -1.
  private static nextPos(text: string, substring: string, pos: number): number {
    const index = text.indexOf(substring, pos);
    return index == -1 ? text.length : index;
  }
}
