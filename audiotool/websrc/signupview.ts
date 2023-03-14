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
  eligible: boolean;
  signinDiv: JQuery<HTMLElement>;
  checkbox1: JQuery<HTMLElement>;
  checkbox2: JQuery<HTMLElement>;
  nextButton: JQuery<HTMLElement>;
  authExplain: JQuery<HTMLElement>;
  
  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.eligible = app.data.loadEligibility();
    this.div = app.main.eadd('<div id=signupview />');
    this.div.hide();

    // Page 1: Introduction and eligibility checkboxes
    const page1Div = this.div.eadd('<div class=page1 />');
    page1Div.eadd('<div class=title />').eitext(`Welcome to Project Euphonia!`);
    const introDiv = page1Div.eadd('<div class=intro />');
    introDiv.eadd('<div />').eitext(`We're exploring how Google products and services
        that use speech as an input method could work better for more people. We're seeking
        voice contributions from adults who have difficulty being understood by others.
        Voice samples can help us improve how Google understands individuals with speech
        impairments.`);

    introDiv.eadd('<div />').eihtml(`<b>IMPORTANT:</b> If you're filling out
        this form on behalf of someone else, please ensure you have their permission
        to do so.`);
    introDiv.eadd('<div />').eihtml(`Questions?
        <a target="_blank" href="mailto:euphonia-project@google.com">Contact Us</a>`);
    this.signinDiv = introDiv.eadd('<div />');
    this.signinDiv.eadd('<span />').eihtml('Already enrolled? &nbsp;');
    this.signinDiv.eadd('<a href="#" />').eitext('Click to sign in and continue recording').on('click', async e => await this.login(true));
    this.signinDiv.eshow(firebase.auth().currentUser == null);
    
    // confirm basic eligibility
    const questionBox1 = page1Div.eadd('<div class=questionbox />');
    questionBox1.eadd('<div class=questiontext />').eitext('To get started, please confirm your eligibility:');
    this.checkbox1 = questionBox1.eadd('<input class=checkbox type=checkbox id=strangerscheckbox class=row1 />');
    questionBox1.eadd('<label for=strangerscheckbox class=row1 />').eitext(
      `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`);
    this.checkbox2 = questionBox1.eadd('<input class=checkbox type=checkbox id=agecheckbox class=row2 />');
    questionBox1.eadd('<label for=agecheckbox class=row2 />').eitext('I am at least 18 years of age');

    // Let them continue to the next page, or sign in
    this.nextButton = questionBox1.eadd('<button />').eitext('Sign in and continue');
    this.authExplain = questionBox1.eadd('<div class=accountexplain />').eitext(
      `You will need to sign in with your Google
       Account to contribute to the project. If you do not have a Google Account, you can
       create one when you click to continue.`);
    this.nextButton.on('click', async e => await this.handleNext());

    // If they previously answered, load their answers
    this.checkbox1.echecked(this.eligible);
    this.checkbox2.echecked(this.eligible);
  }

  // Called when the user clicks the next button.
  private async handleNext(): Promise<void> {
    if (!this.checkbox1.is(':checked') || !this.checkbox2.is(':checked')) {
      this.app.showMessage('You must confirm your eligibility to continue.', 'error');
      return;
    }

    this.eligible = true;
    this.data.saveEligibility();
    if (firebase.auth().currentUser == null) {
      // Have them sign in, so that we can more quickly notice if they are
      // already signed up. They'll come back here once logged in.
      await this.login(true);
    } else {
      await this.app.navigateTo('/interest');
    }
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);
    if (show && this.eligible) {
      this.app.showMessage('You previously indicated that you are eligible.');
    }
  }

  // Hide or show the signin link if The signed-in state changed
  async handleUpdate() {
    this.eligible = this.app.data.loadEligibility();
    const hasUser = firebase.auth().currentUser != null;
    this.signinDiv.eshow(!hasUser);
    this.nextButton.eitext(hasUser ? 'Continue' : 'Sign in and continue');
    this.authExplain.eshow(!hasUser);
  }

  // Runs the Firebase login flow when the user clicks next.
  private async login(autoNavigate: boolean) {
    await Spinner.waitFor(async () => {
      // If they already have an account, they'll go straight to the app after this. See Data.handleUserAuth
      const cred = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      await this.app.data.handleUserAuth(cred ? cred.user : null);
      if (autoNavigate) {
        // pick the best screen based on their account state
        await this.app.navigateTo('');
      }
    });
  }
}
