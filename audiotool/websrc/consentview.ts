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
import * as firebaseconfig from './firebaseconfig';
import * as schema from '../commonsrc/schema';
import {parseTags} from '../commonsrc/util';
import {toast, Spinner} from './util';

// Shows the consents to the user immediately before they enroll.
export class ConsentView {
  app: App;
  data: Data;
  div: JQuery<HTMLElement>;
  consentDiv: JQuery<HTMLElement>;
  language: string;
  tags: string[];
  consents?: schema.EConsentInfo[];
  agreements: schema.EAgreementInfo[] = [];

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=consentview />');
    this.div.hide();

    if (this.data.user) {
      // The user is already enrolled so get their language and tags
      this.language = this.data.user.language;
      this.tags = this.data.user.tags;
    } else {
      // Get the applicable language code and tags from their invite URL
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang');
      this.language = lang ? lang : firebaseconfig.DEFAULT_SIGNUP_LANGUAGE;
      this.tags = parseTags(params.get('t'));
    }

    // Consent view, shown after signup but before recording
    this.div.eadd('<div class=title />').etext(`Welcome to Project Euphonia!`);
    this.div.eadd(`<div class=wholine>You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
        Please review the following agreement: <span id=consentcounter></span></div>`);
    this.consentDiv = this.div.eadd('<div class=consentarea />');
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    if (show) {
      $('#whoisenrolling').text(this.data.fbuser!.email);
      this.consents = await this.data.listConsents(this.language, this.tags);
      this.consents = this.consents.filter(c => !this.hasAgreement_(c));

      if (this.consents.length < 1) {
        this.displayError_();
      } else {
        await this.displayConsentIdx_(0);
      }
    }
    this.div.eshow(show);
  }

  // Shows an error if there are no consents to load
  displayError_() {
    this.consentDiv.addClass('consenterror');
    this.consentDiv.text('Unfortunately enrollment is not configured. Please check the URL or contact your program administrator.');
  }

  // Returns true if this user has already agreed to this consent
  hasAgreement_(consent: schema.EConsentInfo): boolean {
    if (!this.data.user) {
      return false;  // No prior agreements of any sort
    }
    if (consent.versions.length != 1) {
      throw new Error(`Unexpected multiple live versions for consent: ${consent.id}`);
    }
    for (let agreement of this.data.user.consents) {
      if (agreement.consentId == consent.id &&
          agreement.version == consent.versions[0].version &&
          agreement.revokeTimestamp == 0 &&
          agreement.consentTimestamp != 0) {
        return true;  // The user agreed to this already
      }
    }
    return false;  // No matching agreements
  }

  // Updates the consent scrollthrough view with the given consent item from the array.
  async displayConsentIdx_(idx: number) {
    const consentCount = this.consents!.length;
    const consent = this.consents![idx];
    const isLast = idx + 1 >= consentCount;
    if (consent.versions.length != 1) {
      throw new Error(`Unexpected applicable versions for consent: ${consent.id}: ${consent.versions.length} versions`);
    }
    if (idx != 0 || !isLast) {
      $('#consentcounter').html(`&nbsp;(Agreement ${idx + 1} of ${consentCount})`);
    }

    this.consentDiv.empty();
    const textDiv = this.consentDiv.eadd('<div class=consentscroll />');
    textDiv.html(await this.data.loadConsentText(consent.id, consent.versions[0].version));

    const consentBox = this.consentDiv.eadd('<div class=consentbox />');
    const cb = consentBox.eadd('<input type=checkbox id=agreementcheckbox />');
    consentBox.eadd('<label for=agreementcheckbox />').etext('I agree to the terms above');

    const nextButton = this.consentDiv.eadd('<button class=nextbutton />');
    nextButton.etext(isLast ? 'Enroll' : 'Next Agreement');
    nextButton.on('click', async e => {
      if (!consent.optional && !cb.is(':checked')) {
        toast('You must agree to the terms to continue');
        return;
      }
      this.agreements.push({
        consentId: consent.id,
        version: consent.versions[0].version,
        consentTimestamp: 0,
        revokeTimestamp: 0
      });
      await Spinner.waitFor(async () => {
        if (isLast) {
          await this.doSaveAgreement_();
        } else {
          await this.displayConsentIdx_(idx + 1);
        }
      });
    });
  }

  // Signs the user up for the program.
  async doSaveAgreement_() {
    if (!this.data.user) {
      // Enroll a new user
      await this.data.enroll(this.language, this.tags, this.agreements);
    } else {
      // The user is already enrolled, so we only need to update their agreements.
      await this.data.updateAgreements(this.agreements);
    }
  }

  // Unused
  async handleUpdate() {
  }
}
