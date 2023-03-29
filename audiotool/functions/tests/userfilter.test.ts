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

/// <reference types="intern" />

import {UserFilter} from '../../commonsrc/userfilter';
import {EUserInfo} from '../../commonsrc/schema';
const { registerSuite } = intern.getPlugin('interface.object');
const { expect } = intern.getPlugin('chai');

registerSuite('userfilter', {
  async 'tokenize'() {
    // Simple tokens
    testtok('');
    testtok('foo', 'foo');
    testtok('foo bar', 'foo', 'bar');
    testtok('hello!', 'hello!');
    testtok('hello!fred', 'hello!fred');
    testtok('hello! fred', 'hello!', 'fred');

    // Handle varying whitespace whitespace
    testtok('foo  bar', 'foo', 'bar');
    testtok('foo    \t \n  bar', 'foo', 'bar');
    testtok('  foo    \t \n  bar', 'foo', 'bar');
    testtok('  foo    \t \n  bar  ', 'foo', 'bar');
    testtok('  foo    bar  ', 'foo', 'bar');
    testtok('  foo    bar baz ', 'foo', 'bar', 'baz');
    testtok('  foo    bar  baz', 'foo', 'bar', 'baz');
    testtok('hello!    fred', 'hello!', 'fred');

    // Quoted strings
    testtok(`"hi"`, 'hi');
    testtok(`"hi there"`, 'hi there');
    testtok(`"hi  there" you "are fun"`, 'hi  there', 'you', 'are fun');
    testtok(`"hi  there" you   "are fun"`, 'hi  there', 'you', 'are fun');
    testtok(`"hi  there" you   "are fun" tag:to_talk_to`, 'hi  there', 'you', 'are fun', 'tag:to_talk_to');

    // Escaped quotes within tokens, and quoted tokens
    testtok('\\"', `"`);
    testtok('\\"\\"', `""`);
    testtok('hi\\"there', `hi"there`);
    testtok('hi\\"there', `hi"there`);
    testtok('hi\\"there you\\"crazy\\"person', `hi"there`, `you"crazy"person`);
    testtok('"hi\\"there"', `hi"there`);
    testtok('"\\"hi\\" there" ', `"hi" there`);
  },

  async 'filter'() {
    const TEST_USERS = [
      testuser({euid: 'E111', email: '111@foo.com', tags: ['one', 'two', 'three']}),
      testuser({euid: 'E222', email: '222@bar.com', tags: ['one', 'three']}),
      testuser({euid: 'E333', email: '333@baz.org', tags: ['two'], numRecordings: 200}),
      testuser({euid: 'E444', email: '444@goo.zzz'}),
    ];

    // Checks that a given query matches the given list of users by array index
    function checkMatches(query: string, ...expectedUsersByIndex: number[]) {
      const actual = [] as number[];
      const predicate = UserFilter.parse(query);
      for (let i = 0; i < TEST_USERS.length; i++) {
        if (predicate(TEST_USERS[i])) {
          actual.push(i);
        }
      }
      expect(actual).to.have.members(expectedUsersByIndex);
    }

    // Test that various queries match the four test users above
    checkMatches('', 0, 1, 2, 3);
    checkMatches('E111', 0);
    checkMatches('blargh');  // no matches
    checkMatches('333@baz.org', 2);

    // Structured tag searches
    checkMatches('tag:two', 0, 2);
    checkMatches('tag:one tag:two', 0);
    checkMatches('tag:one tag:three', 0, 1);
    checkMatches('tag:three  tag:one', 0, 1);
    checkMatches('tag:thre  tag:one');  // no partial mattch
    checkMatches('taglike:thr  tag:one', 0, 1);  // taglike gives partial matches
    checkMatches('-tag:one', 2, 3);
    checkMatches('-tag:two', 1, 3);
    checkMatches('-tag:bah', 0, 1, 2, 3);

    // Language
    checkMatches('language:en', 0, 1, 2, 3);
    checkMatches('language:en tag:two', 0, 2);

    // Dates and counts
    checkMatches('created:2022/01/01', 0, 1, 2, 3);  // everyone is after this date
    checkMatches('created:2023/04/01');  // nobody is after this date
    checkMatches('created:2022/01/01 recordings:2', 0, 1, 2, 3);
    checkMatches('created:2022/01/01 recordings:10', 0, 1, 2, 3);
    checkMatches('recordings:10', 0, 1, 2, 3);
    checkMatches('recordings:11', 2);
    checkMatches('recordings:199', 2);
    checkMatches('recordings:200', 2);
    checkMatches('recordings:201');
    checkMatches('recordings:2000');
  }
});

// Checks that the given string is parsed into the given list of tokens
function testtok(s: string, ...expected: string[]) {
  const actual = [...UserFilter.tokenize(s)];
  expect(actual).to.eql(expected);
}

// Returns a test EUserInfo with some of its properties set.
function testuser(values: Partial<EUserInfo>): EUserInfo {
  const result: any = {
    euid: 'E111',
    email: '111@foo.com',
    name: 'Foo User',
    language: 'en-US',
    tags: [],
    consents: [],
    notes: '',
    numRecordings:    10,
    numTasks:          5,
    numCompletedTasks: 2,
    createTimestamp:        Date.parse('2023-01-01T01:01:01.000Z'),
    signupTimestamp:        Date.parse('2023-01-01T01:01:01.000Z'),
    lastRecordingTimestamp: Date.parse('2023-02-01T01:01:01.000Z'),
    numAssignmentsByTaskSet: []
  };
  const valuesBag = values as any;
  for (const key in valuesBag) {
    result[key] = valuesBag[key];
  }
  return result as EUserInfo;
}