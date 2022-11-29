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

import { EStorage } from '../src/estorage';
import { AudioApi } from '../src/audioapp';
import * as testdata from './testdata';
import * as schema from '../../commonsrc/schema';
import * as supertest from 'supertest';
const { registerSuite } = intern.getPlugin('interface.object');
const { assert } = intern.getPlugin('chai');
import * as express from 'express';
import * as http from 'http';

registerSuite('consent', {
  async 'filtering'() {
    const now = 1652644934000 + 10 * 24 * 3600 * 1000;
    const deps = new testdata.Deps();
    deps.firestore.createTestConsent(testdata.TEST_CONSENT1_INFO_JSON);
    deps.firestore.createTestConsent(testdata.TEST_CONSENT2_INFO_JSON);
    const storage = new EStorage(deps);
    const allConsents = await storage.listConsents();

    // No applicable languages should result in an empty set, regardless of tags
    assert.deepEqual([], await storage.listApplicableConsents('fr-FR', [], now));
    assert.deepEqual([], await storage.listApplicableConsents('fr-FR', ['foo'], now));
    assert.deepEqual([], await storage.listApplicableConsents('fr-FR', ['bar'], now));

    // A tagged consent isn't applicable to a tagless user
    assert.deepEqual([allConsents[1]], await storage.listApplicableConsents('en-US', [], now));

    // With the matching tag, then both consents apply
    assert.deepEqual(allConsents, await storage.listApplicableConsents('en-US', ['foo'], now));
    assert.deepEqual(allConsents, await storage.listApplicableConsents('en-US', ['foo', 'bar'], now));
    assert.deepEqual(allConsents, await storage.listApplicableConsents('en-US', ['bar', 'foo', 'bah'], now));

    // With no matching tags, only the tagless consent applies
    assert.deepEqual([allConsents[1]], await storage.listApplicableConsents('en-US', ['baz'], now));

    // Consents that have a liveTimestamp in the future shouldn't be returned.
    assert.deepEqual([], await storage.listApplicableConsents('en-US', [], now -  1000 * 24 * 3600 * 1000));

    // Inactive consents shouldn't be returned.
    const consent3 = JSON.parse(testdata.TEST_CONSENT2_INFO_JSON);
    consent3.active = false;
    deps.firestore.createTestConsent(JSON.stringify(consent3));
    assert.deepEqual([], await storage.listApplicableConsents('en-US', [], now));
    assert.deepEqual([allConsents[0]], await storage.listApplicableConsents('en-US', ['foo'], now));
  },
});

registerSuite('server', () => {
  let testDeps: testdata.Deps;
  let testExpress: express.Express;
  let testServer: http.Server;

  return {
    async beforeEach() {
      testDeps = new testdata.Deps();
      testExpress = AudioApi.createExpressServer(testDeps);
      await new Promise<void>((resolve, reject) => {
        testServer = testExpress.listen((err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
    async afterEach() {
      await testServer.close();
    },

    async 'testsignupAndGetUser'() {
      // Create some consents to agree to
      testDeps.firestore.createTestConsent(testdata.TEST_CONSENT1_INFO_JSON);
      testDeps.firestore.createTestConsent(testdata.TEST_CONSENT2_INFO_JSON);
  
      // Initially the authenticated user should not exist
      const response0 = await supertestPostJson(testExpress, '/api/getuser', {}).expect(200);
      assert.equal('[]', response0.text);

      // Sign the user up
      const data = {
        language: 'en-US',
        tags: [],
        consents: [{consentId: 'test2', version: 1}]  // these have to match the test consents
      };
      const response = await supertestPostJson(testExpress, '/api/signup', data)
          .expect(200);
      const [userinfo] = JSON.parse(response.text) as schema.EUserInfo[];
      assert.isNotNull(userinfo);
      assert.isNotNull(userinfo.euid);
      assert.equal(userinfo.language, 'en-US');
      assert.deepEqual(userinfo.tags, []);
      assert.deepEqual(userinfo.name, 'Testy Tester');
      assert.deepEqual(userinfo.email, 'test@test.com');
      
      // There should now be a new user in the database
      const u = await new EStorage(testDeps).loadUser(userinfo.euid);
      assert.deepEqual(u.info, userinfo);

      // They should also have a lookup by email, so we can find them by login instead of EUID
      const u2 = await new EStorage(testDeps).loadUserByEmail(userinfo.email);
      assert.deepEqual(u2!.info, userinfo);

      // Now we can fetch the user and get that same data
      const response2 = await supertestPostJson(testExpress, '/api/getuser', {}).expect(200);
      const [userinfo2] = JSON.parse(response2.text) as schema.EUserInfo[];
      assert.deepEqual(userinfo, userinfo2);

      // The consent's user counter should have incremented for the version they consented to
      const consent2 = await new EStorage(testDeps).loadConsent('test2');
      assert.equal(1, consent2!.info.versions.length);
      assert.equal(1, consent2!.info.versions[0].numUsers);
    },
  };
});

// Returns a supertest that has POSTed the given JSON object to the given path.
function supertestPostJson(express: express.Express, path: string, obj: any): supertest.Test {
  return supertest(express)
      .post(path)
      .set('Content-Type', 'application/octet-stream')
      .send(Buffer.from(JSON.stringify(obj), 'utf-8'))
      ;
}
