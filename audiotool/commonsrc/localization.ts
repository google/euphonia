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

import {ELocaleString} from './schema';
import {EN_STRINGS} from './strings_en';
import {ES_STRINGS} from './strings_es';

// Describes all localizations
export const LOCALIZED_STRINGS: Map<string, Map<string, ELocaleString>> = new Map([
  ['en-US', toLocaleTable(EN_STRINGS)],
  ['en-GB', toLocaleTable(EN_STRINGS)],
  ['es-ES', toLocaleTable(ES_STRINGS)],
]);

// Builds a map of the translated strings for a given language.
function toLocaleTable(translations: ELocaleString[]): Map<string, ELocaleString> {
  const result = new Map();
  for (const s of translations) {
    const key = lkey(s.key);
    if (result.has(key)) {
      throw new Error(`Key already defined for language: ${key}`);
    }
    result.set(key, s);
  }
  return result;
}

// Normalizes case and whitespace for the purposes of localization key lookup.
function lkey(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
};

// Localizes the given string into the given language, substituting arguments
// in the given format string as needed. Substitution proceeds by inserting any values
// from the given key/value list into the format string into matching values denoted by
// curly braces. There is no escape sequence; if text enclosed in any number of curly braces
// have no exact match to a supplied argument in the map, they are left as-is.
export function formatWithArgs(lang: string, formatString: string, ...argsList: string[]): string {
  if (formatString.trim() == '') {
    return formatString;  // ignore blanks
  }

  // Target the current language if there is a translation.
  const langMap = LOCALIZED_STRINGS.get(lang);
  const localizedString = langMap ? langMap.get(lkey(formatString)) : undefined;
  if (!langMap || !localizedString) {
    console.log(`Warning: no localization in lang[${lang}]:\n${formatString}\n===============`);
    console.log((new Error()).stack);
  } else {
    formatString = localizedString.text;
  }

  // Also localize the argument values, if relevant
  const args = new Map();
  for (let i = 0; i < argsList.length; i += 2) {
    const key = argsList[i];
    const value = argsList[i + 1];
    const localizedValue = langMap ? langMap.get(lkey(value)) : null;
    args.set(key, localizedValue ? localizedValue.text : value);
  }

  if (formatString.indexOf('{') === -1) {
    if (args && args.size > 0) {
      throw new Error(`Arguments supplied to non-parameterized format string: ${formatString}`);
    }
    return formatString;  // simple case: no arguments needed
  }

  // Error check argument strings
  for (const arg of args.keys()) {
    if (arg.indexOf('}') != -1) {
      throw new Error(`Invalid format argument: ${arg}`);
    }
  }

  const found = new Set();
  let isFirst = true;
  let result = '';
  for (const part of formatString.split(/\{/)) {
    let isSub = false;
    for (const arg of args.keys()) {
      const sub = `${arg}}`;
      if (part.startsWith(sub)) {
        result += args.get(arg);
        result += part.substring(sub.length);
        found.add(arg);
        isSub = true;
        break;
      }
    }
    if (!isSub) {
      // No matching argument was found, so leave this unsubstituted
      if (!isFirst) {
        result += '{';
      }
      isFirst = false;
      result += part;
    }
  }

  for (const arg of args.keys()) {
    if (!found.has(arg)) {
      throw new Error(`Unused argument: ${arg}`);
    }
  }

  return result;
}
