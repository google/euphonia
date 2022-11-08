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

import {Data} from './data';
import {App} from './app';
import {Spinner} from './util';

// Implements the Sign Up experience for users that aren't signed in or don't have an account yet.
export class SignupView {
  app: App;
  data: Data;
  div: JQuery<HTMLElement>;

  // Pre-login experience: eligibility and signin
  eligible: boolean = false;
  page1Div: JQuery<HTMLElement>;
  signinDiv: JQuery<HTMLElement>;
  
  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=signupview />');
    this.div.hide();

    // Page 1: Introduction and eligibility checkboxes
    this.page1Div = this.div.eadd('<div class=page1 />');
    this.page1Div.eadd('<div class=title />').text(`Welcome to Project Euphonia!`);
    const introDiv = this.page1Div.eadd('<div class=intro />');
    introDiv.eadd('<div />').text(`We're exploring how Google products and services
        that use speech as an input method could work better for more users. We're seeking
        voice contributions from adults who have difficulty being understood by others.
        Voice samples can help us improve how Google understands individuals with speech
        impairments.`);

    introDiv.eadd('<div />').html(`<b>IMPORTANT:</b> If you're filling out
        this form on behalf of someone else, please ensure you have their permission
        to do so.`);
    introDiv.eadd('<div />').html(`Questions?
        <a target="_blank" href="https://google-health.force.com/s/form?type=euphoniaform">Contact Us</a>`);
    this.signinDiv = introDiv.eadd('<div />');
    this.signinDiv.eadd('<span>Already enrolled? &nbsp;</span>');
    this.signinDiv.eadd(`<a href="#">Click to sign in and continue recording</a>`).on('click', async e => await this.login_(true));
    this.signinDiv.eshow(firebase.auth().currentUser == null);
    
    // confirm basic eligibility
    const questionBox1 = this.page1Div.eadd('<div class=questionbox />');
    questionBox1.eadd('<div class=questiontext />').etext('To get started, please confirm your eligibility:');
    const cb1 = questionBox1.eadd('<input class=checkbox type=checkbox id=strangerscheckbox class=row1 />');
    questionBox1.eadd('<label for=strangerscheckbox class=row1 />').etext(`Strangers or people I just
        met find it difficult to understand my speech (not because of an accent)`);
    const cb2 = questionBox1.eadd('<input class=checkbox type=checkbox id=agecheckbox class=row2 />');
    questionBox1.eadd('<label for=agecheckbox class=row2 />').etext('I am at least 18 years of age');

    // Let them continue to the next page, or sign in
    const nextButton = questionBox1.eadd('<button>Sign in and continue</button>');
    questionBox1.eadd('<div class=accountexplain />').etext(`You will need to sign in with your Google
        Account to contribute to the project. If you do not have a Google Account, you can
        create one when you click to continue.`);
    nextButton.on('click', async e => {
      if (!cb1.is(':checked') || !cb2.is(':checked')) {
        this.app.showMessage('You must confirm your eligibility to continue.', 'error');
        return;
      }

      this.eligible = true;
      if (firebase.auth().currentUser == null) {
        // Have them sign in, so that we can more quickly notice if they are
        // already signed up. They'll come back here once logged in.
        await this.login_(false);
      }
      await this.app.navigateTo('/interest');
    });
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);
  }

  // Hide or show the signin link if The signed-in state changed
  async handleUpdate() {
    this.signinDiv.eshow(firebase.auth().currentUser == null);
  }

  // Runs the Firebase login flow when the user clicks next.
  async login_(autoNavigate: boolean) {
    const cred = await Spinner.waitFor(async () => {
      // If they already have an account, they'll go straight to the app after this. See Data.handleUserAuth_
      return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    });
    await this.app.data.handleUserAuth_(cred ? cred.user : null);
    if (autoNavigate) {
      // pick the best screen based on their account state
      await this.app.navigateTo('');
    }
  }
}
