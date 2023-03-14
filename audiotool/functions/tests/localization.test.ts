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

import {formatWithArgs} from '../../commonsrc/localization';
const { registerSuite } = intern.getPlugin('interface.object');
const { assert } = intern.getPlugin('chai');

registerSuite('localization', {
  async 'format'() {
    // Argless results
    testnofmt('simple string');
    testnofmt('nosubs {are} wanted');
    testnofmt('weird {{{{ curlies');
    testnofmt('{weird {{{{ curlies');
    testnofmt('something .* weird');

    // Simple substitutions
    testfmt('a simple {value} substitution', 'a simple foo substitution', 'value', 'foo');
    testfmt('{a simple {value} substitution', '{a simple foo substitution', 'value', 'foo');
    testfmt('a simple {value} subst{itution}', 'a simple foo subst{itution}', 'value', 'foo');

    // Extraneous curlies and arg-looking values
    testfmt('a simple {value} subst{itution} value}', 'a simple foo subst{itution} value}', 'value', 'foo');
    testfmt('a {value } simple {value} subst{itution} value}', 'a {value } simple foo subst{itution} value}', 'value', 'foo');

    // Multiple, repeated
    testfmt('a simple {value} subst{itution}', 'a simple foo substbar', 'value', 'foo', 'itution', 'bar');
    testfmt('{one}{two}{one}{three}{one}{two}', '121312', 'one', '1', 'two', '2', 'three', '3');
    testfmt('{{one}{two}{one}{three}{one}{two} extra {stuff}}', '{121312 extra {stuff}}', 'one', '1', 'two', '2', 'three', '3');
    testfmt('a simple {value} subst{itution} is {value} here', 'a simple foo subst{itution} is foo here', 'value', 'foo');

    // Real translations, accepting of whitespace and case variations
    assert.equal(formatWithArgs('es-ES', 'Welcome to Project Euphonia!'), '¡Bienvenidos al Project Euphonia!');
    assert.equal(formatWithArgs('es-ES', 'Welcome to   Project  \n\  euphonia!'), '¡Bienvenidos al Project Euphonia!');
    assert.equal(formatWithArgs('es-ES', '  WELCOME to project\teuphonia!   '), '¡Bienvenidos al Project Euphonia!');
    assert.equal(formatWithArgs('es-ES', 'Welcome   to Project euPHONia!'), '¡Bienvenidos al Project Euphonia!');
  },
});

// Checks that the formatter makes no changes to the given string
function testnofmt(s: string) {
  testfmt(s, s);
}

// Checks that the formatter substitutes the given arguments correctly
function testfmt(fmt: string, expected: string, ...args: string[]) {
  const actual = formatWithArgs('en-US', fmt, ...args);
  assert.equal(actual, expected);
}
