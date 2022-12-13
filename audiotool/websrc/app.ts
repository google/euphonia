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
import {InterestView} from './interestview';
import {InstructionsView} from './instructionsview';
import {SetupView} from './setupview';
import {ConsentView} from './consentview';
import {RecordingView} from './recordingview';
import {Spinner, animateCss, sleep, fadeIn} from './util';

// Implements all participant UX.
export class App implements Listener {
  data: Data;
  main: JQuery<HTMLElement>;
  signupView: SignupView;
  interestView: InterestView;
  consentView: ConsentView;
  instructionsView: InstructionsView;
  setupView: SetupView;
  recordingView: RecordingView;

  // Shown on the initial load
  waitingDiv: JQuery<HTMLElement>;
  waitingSpinner?: Spinner;

  // An error message or status report
  messageBox: JQuery<HTMLElement>;

  constructor() {
    // Firebase setup stuff
    euphoniaInitializeFirebase();
    this.data = new Data(this);

    // DOM elements
    this.main = $('#main');
    this.signupView = new SignupView(this);
    this.interestView = new InterestView(this);
    this.consentView = new ConsentView(this);
    this.instructionsView = new InstructionsView(this);
    this.setupView = new SetupView(this);
    this.recordingView = new RecordingView(this);
    this.messageBox = this.main.eadd('<div id=messagebox style="opacity: 0;" />');

    // Default spinner view, so we don't draw the GUI until we've seen one update.
    this.waitingDiv = this.main.eadd('<div class=waiting />');
    this.waitingDiv.text('Loading, please wait...');
    this.waitingSpinner = new Spinner();

    // Events
    $(window).on('hashchange', async e => await this.handleHashChange());
  }

  // Shows a transient message to the user.
  showMessage(text: string, opt_level?: string) {
    const level = opt_level ? opt_level : 'info';
    const isHidden = (this.messageBox.text() === '');
    setTimeout(async () => {
      this.messageBox.etext(text);
      this.messageBox.addClass(level);
      if (isHidden) {
        await fadeIn(this.messageBox);
      }
      await sleep(2000);  
      await animateCss(this.messageBox, level, 'fadeout', 2);
    }, 1);
  }

  clearMessage() {
    this.messageBox.text('');
    this.messageBox.css('opacity', '0');
  }

  // Returns the navigation path from the current browser navbar, or a default otherwise.
  private parseHash() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#')) {
      return this.chooseBestNav();  // Automatically choose the view based on the user's state
    } else {
      return decodeURIComponent(hash.substring(1));
    }
  }

  // Decides where the user should be based on their current state
  private chooseBestNav() {
    if (!this.data.fbuser || !this.data.isCompletedDemographics()) {
      return '/enroll';  // They need to enroll and/or complete the interest form
    } else if (!this.data.consented || !this.data.user) {
      return '/consent';  // They need to consent, or re-consent, and then create their records.
    } else if (this.data.user.numRecordings === 0 && !this.recordingView.seenRecording) {
      return '/instructions';  // Show them instructions since they haven't recorded yet.
    } else if (this.data.hasMicrophonePermission != 'yes') {
      return '/setup?passive=true';  // Test or prompt for the microphone permission
    } else {
      return '/record';  // Ready for recording!
    }
  }

  // Navigates to the given resource.
  async navigateTo(path: string) {
    if (path.startsWith('/enroll')) {
      window.location.hash = `#/enroll`;
    } else if (path.startsWith('/interest')) {
      window.location.hash = `#/interest`;
    } else if (path.startsWith('/consent')) {
      window.location.hash = `#/consent`;
    } else if (path.startsWith('/instructions')) {
      window.location.hash = `#/instructions`;
    } else if (path.startsWith('/setup')) {
      window.location.hash = `#${path}`;
    } else if (path.startsWith('/record')) {
      window.location.hash = `#/record`;
    } else {
      await this.navigateTo(this.chooseBestNav());
    }
  }

  // React to any changes to the user's sign-in state or data
  async handleUpdate() {
    // Always drop the spinner once we've seen the first data update.
    this.waitingDiv.hide();
    if (this.waitingSpinner) {
      this.waitingSpinner.remove();
      this.waitingSpinner = undefined;
    }
    
    // Update the sub-views based on any changes or data
    await this.signupView.handleUpdate();
    await this.interestView.handleUpdate();
    await this.consentView.handleUpdate();
    await this.instructionsView.handleUpdate();
    await this.recordingView.handleUpdate();
    await this.setupView.handleUpdate();

    // Switch to the requested view, or based on the user's state now
    await this.handleHashChange();
  }

  // Surfaces the view identified by the given string hash path when it changes.
  private async handleHashChange() {
    const path = this.parseHash();

    if (path.startsWith('/enroll')) {
      await this.showView(this.signupView);

    } else if (path.startsWith('/interest')) {
      await this.showView(this.interestView);

    } else if (path.startsWith('/consent')) {
      await this.showView(this.consentView);

    } else if (path.startsWith('/instructions')) {
      await this.showView(this.instructionsView);

    } else if (path.startsWith('/setup')) {
      await this.showView(this.setupView);

    } else if (path.startsWith('/record')) {
      await this.showView(this.recordingView);
    } else {
      throw new Error(`Invalid view: ${path}`);
    }
  }

  // Shows the given view and hides the rest.
  private async showView(view: SignupView|InterestView|ConsentView|InstructionsView|SetupView|RecordingView): Promise<void> {
    this.clearMessage();
    await Spinner.waitFor(async () => {
      await this.signupView.eshow(view === this.signupView);
      await this.interestView.eshow(view === this.interestView);
      await this.consentView.eshow(view === this.consentView);
      await this.instructionsView.eshow(view === this.instructionsView);
      await this.setupView.eshow(view === this.setupView);
      await this.recordingView.eshow(view === this.recordingView);
    });
  }
}

// We're using require.js which runs scripts after the dom has loaded, so we can just go.
new App();
