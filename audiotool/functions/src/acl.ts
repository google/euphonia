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

import firebaseadmin = require('firebase-admin');
import express = require('express');
firebaseadmin.initializeApp();

// Tightens the Firebase user object to be non-nullable.
export interface FBUser extends firebaseadmin.auth.DecodedIdToken {
  uid: string;
  email: string;
  name: string;
}

// Extends the Express Request object with the Firebase user.
export interface UserRequest extends express.Request {
  user: FBUser;
}

// Simple access checks for API endpoints
export class ACL {
  static ADMINS = new Set([
    'yourname@gmail.com',
  ]);

  // Ensures that the request is from an authenticated user of some sort, and sets the user on the request.
  static async checkAuthenticated(req: express.Request, res: express.Response) {
    // TODO: don't enforce this on our un-authenticated paths
    if (!req.cookies || !req.cookies.__session) {
      console.error('No __session cookie found.');
      res.status(403).send('Unauthorized');
      return false;
    }
    
    try {
      const user = await firebaseadmin.auth().verifyIdToken(req.cookies.__session);
      if (user.email_verified && user.firebase.sign_in_provider == 'google.com' && user.email && user.uid && user.name) {
        // This is a valid user with an email address of some sort, set the user and allow them through.
        const ureq = req as UserRequest;
        ureq.user = user as FBUser;
        return true;
      } else {
        // Not a valid user
        res.status(401).send('Unrecognized credentials');
        return false;
      }
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(401).send('Error processing credentials');
      return false;
    }
  }

  // Returns false and responds with a 403 unless the given user is a valid admin
  static async checkAdmin(req: UserRequest, res: express.Response) {
    if (!ACL.ADMINS.has(req.user.email)) {
      res.status(403).send(`Unauthorized admin: ${req.user.email}`);
      return false;
    }
    return true;
  }
}

exports.ACL = ACL;
