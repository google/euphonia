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
import {toast, Spinner} from './util';

// Implements the Sign Up experience for users that aren't signed in or don't have an account yet.
// We create a user account as soon as they confirm eligibilty. Consent happens later, and re-consent
// is checked for each time they start recording.
export class SignupView {
  app: App;
  data: Data;
  div: JQuery<HTMLElement>;
  waitingDiv: JQuery<HTMLElement>;
  waitingSpinner?: Spinner;

  // Pre-login experience: eligibility and signin
  page1Done: boolean = false;
  page1Div: JQuery<HTMLElement>;
  signinDiv: JQuery<HTMLElement>;

  // Next page, demographics and interest
  page2Done: boolean = false;
  page2Div: JQuery<HTMLElement>;
  
  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=signupview />');

    // Default spinner view. TODO: animate
    this.waitingDiv = this.div.eadd('<div class=waiting />');
    this.waitingDiv.text('Loading, please wait...');
    this.waitingSpinner = new Spinner();

    // Page 1: Introduction and eligibility checkboxes
    this.page1Div = this.div.eadd('<div class=page1 />');
    this.page1Div.eadd('<div class=title />').text(`Welcome to Project Euphonia!`);
    this.page1Div.hide();
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
        <a href="https://google-health.force.com/s/form?type=euphoniaform">Contact Us</a>`);
    this.signinDiv = introDiv.eadd('<div />');
    this.signinDiv.eadd('<span>Already enrolled? &nbsp;</span>');
    this.signinDiv.eadd(`<a href="#">Click to sign in and continue recording</a>`).on('click', async e => await this.login_());
    this.signinDiv.eshow(firebase.auth().currentUser == null);
    
    // confirm basic eligibility
    const questionBox1 = this.page1Div.eadd('<div class=questionbox />');
    questionBox1.eadd('<div class=questiontext />').etext('To get started, please confirm your eligibility:');
    const cb1 = questionBox1.eadd('<input type=checkbox id=strangerscheckbox class=row1 />');
    questionBox1.eadd('<label for=strangerscheckbox class=row1 />').etext(`Strangers or people I just
        met find it difficult to understand my speech (not because of an accent)`);
    const cb2 = questionBox1.eadd('<input type=checkbox id=agecheckbox class=row2 />');
    questionBox1.eadd('<label for=agecheckbox class=row2 />').etext('I am at least 18 years of age');

    // Let them continue to the next page, or sign in
    const next1Button = questionBox1.eadd('<button>Sign in and continue</button>');
    questionBox1.eadd('<div class=accountexplain />').etext(`You will need to sign in with your Google
        Account to contribute to the project. If you do not have a Google Account, you can
        create one when you click to continue.`);
    next1Button.on('click', async e => {
      if (!cb1.is(':checked') || !cb2.is(':checked')) {
        toast('You must confirm your eligibility to continue');
        return;
      }

      this.page1Done = true;
      if (firebase.auth().currentUser == null) {
        // Have them sign in, so that we can more quickly notice if they are
        // already signed up. They'll come back here once logged in.
        await Spinner.waitFor(async () => {
          await this.login_();
        });

      } else {
        // Show the next page
        this.page1Div.hide();
        this.page2Div.show();
      }
    });

    // Page 2: demographics and geographic eligibility
    this.page2Div = this.div.eadd('<div class=page2 />');
    this.page2Div.etext('TODO: page 2');
    this.page2Div.hide();
    const next2Button = this.page2Div.eadd('<button>Next</button>');
    next2Button.on('click', async e => {
      // Go to the consent page
      this.page2Done = true;
      this.app.showView(this.app.consentView);
    });
    // - title
    // - box 1: About you
    //   - Name
    //     Nickname, first & last name, just first name, etc. Any way you like to be addressed!)
    //   - Best email for contacting you (if not XXX@foo.com)
    //     We'll correspond with you at this address instead of XXX@foo.com
    //   - What country do you reside in?
    //     IMPORTANT, PLEASE NOTE:  We are regrettably unable to send gift cards at this time to residents of the countries indicated below with an asterisk (*).  If you reside in one of these countries, you are still welcome to participate in Project Euphonia research, and we'll notify you if and when you'll be able to receive gift cards.
    //   - What State (USA) do you reside in?
    //   - What city do you live in?
    //   - How would you characterize your accent?
    //   - How did you hear about this project?
    //   - What is your gender? [Optional]
    //     - Male
    //     - Female
    //     - Other: __________
    //     - Prefer not to say
    //   - What is your race? [Optional]
    //   - Which of these do you have access to?
    //     - An internet-connected computer equipped with a microphone and speakers
    //     - An Android phone (like a Samsung, Pixel, Nexus, etc.)
    //     - An iPhone
    //     - None of the above
    //     - Other: __________
    //   - What type of smartphone or tablet do you use as your primary device?
    //     - iPhone
    //     - Android - Pixel 4/4XL or newer (Google phones)
    //     - Android - other (eg. Samsung, Motorola, LG, Pixel 1/2/3)
    //     - iOS or Android Tablet (eg. iPad)
    //     - I have a smartphone and/or tablet, but I’m not sure what type
    //     - I don’t use a smartphone or tablet
    //     - Other: _________
    //   - Will someone be helping you record speech samples?
    //     For example, a family member, speech therapist, or other person
    //     - No, I'll be participating independently
    //     - Yes, someone will be helping me and is comfortable with me sharing their contact info
    //   [conditional helper]
    //   About the person helping you
    //   Please tell us a bit about the person helping you, so we can best stay in touch with both of you. By including your assistant's name, you understand that they will receive information about your participation in this project. You can list more than one Assistant and email: just separate each one with a comma.
    //   - Assistant's name
    //   - Assistant's email address
    //   - What is this person's relationship to you?
    //     For example:  caregiver, friend, family member, speech therapist, etc.
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);
    this.waitingDiv.hide();
    if (this.waitingSpinner) {
      this.waitingSpinner.remove();
      this.waitingSpinner = undefined;
    }
    if (!show) {
      return;  // Don't need any other GUI changes for now
    }

    // Move to whatever page they haven't done yet
    if (!this.page1Done) {
      this.page1Div.show();
      this.page2Div.hide();
      this.signinDiv.eshow(firebase.auth().currentUser == null);

    } else if (!this.page2Done) {
      this.page1Div.hide();
      this.page2Div.show();
    }
  }

  // Runs the Firebase login flow.
  async login_() {
    // If they already have an account, they'll go straight to the app after this. See Data.handleUserAuth_
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // Unused for now
  async handleUpdate() {
  }
}
