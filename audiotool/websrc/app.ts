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

import {euphoniaInitializeFirebase} from './firebaseconfig';
import {Data, Listener} from './data';
import {SignupView} from './signupview';
import {InstructionsView} from './instructionsview';
import {ConsentView} from './consentview';
import {RecordingView} from './recordingview';
import {Spinner} from './util';

// Implements all participant UX.
export class App implements Listener {
  data: Data;
  main: JQuery<HTMLElement>;
  signupView: SignupView;
  consentView: ConsentView;
  instructionsView: InstructionsView;
  recordingView: RecordingView;

  constructor() {
    // Firebase setup stuff
    euphoniaInitializeFirebase();
    this.data = new Data(this);

    // DOM elements
    this.main = $('#main');
    this.signupView = new SignupView(this);
    this.consentView = new ConsentView(this);
    this.instructionsView = new InstructionsView(this);
    this.recordingView = new RecordingView(this);
  }

  // React to any changes to the user's sign-in state or data
  async handleUpdate() {
    // Switch the view based on the user's state
    if (!this.data.fbuser || !this.data.user) {
      // They need to enroll
      await this.showView(this.signupView);

    } else if (!this.data.consented) {
      // They need to consent, or re-consent.
      await this.showView(this.consentView);

    } else if (this.data.user.numRecordings == 0 && !this.recordingView.seenRecording) {
      // Show them instructions since they haven't recorded yet.
      await this.showView(this.instructionsView);

    } else {
      // Ready for recording!
      await this.showView(this.recordingView);
    }

    // Also update the sub-views if they wish
    await this.signupView.handleUpdate();
    await this.consentView.handleUpdate();
    await this.instructionsView.handleUpdate();
    await this.recordingView.handleUpdate();
  }

  // Shows the given view and hides the rest.
  async showView(view: SignupView|ConsentView|InstructionsView|RecordingView): Promise<void> {
    await Spinner.waitFor(async () => {
      await this.signupView.eshow(view == this.signupView);
      await this.consentView.eshow(view == this.consentView);
      await this.instructionsView.eshow(view == this.instructionsView);
      await this.recordingView.eshow(view == this.recordingView);
    });
  }
}

// We're using require.js which runs scripts after the dom has loaded, so we can just go.
new App();
