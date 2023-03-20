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
import {UserDemographics} from '../commonsrc/schema';
import {listhas} from '../commonsrc/util';

// Implements the Interest form experience.
export class InterestView {
  app: App;
  data: Data;
  div: JQuery<HTMLElement>;

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=interestform />');
    this.div.hide();

    const insetBox = this.div.eadd('<div class=interestformscroll />');
    insetBox.eihtml('__INTEREST_FORM_HTML__');
    $('#helpersection').hide();

    // State/country box conditional wiring
    $('#ifcountry').on('change', e => $('#usstatebox').eshow($('#ifcountry').val() === 'USA'));

    // Helper box conditional wiring
    const helperchangefn = e => {
      $('#helpersection').eshow($('#ifhelperyes').is(':checked'));
    };
    $('#ifhelperyes').on('change', helperchangefn);
    $('#ifhelperno').on('change', helperchangefn);

    const buttons = insetBox.eadd('<div class=ifbuttons />');
    const nextButton = buttons.eadd('<button class=next />').eitext('Next');
    const backButton = buttons.eadd('<button />').eitext('Go Back');
    const clearButton = buttons.eadd('<button />').eitext('Reset form and start over');
    backButton.on('click', async e => {
      const d = this.collect();
      this.data.saveDemographics(d);
      await this.app.navigateTo('/enroll');
    });
    nextButton.on('click', async e => {
      // Go to the consent page if the user's form inputs are valid
      if (await this.save()) {
        await this.app.navigateTo('/consent');
      }
    });
    clearButton.on('click', async e => this.clear());
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);
    if (!show) {
      return;  // Don't need any other GUI changes for now
    }

    if (show && this.data.user) {
      this.app.showMessage('You have already completed this form.');
    }
    
    // Populate the interest form with any saved choices the user made
    this.fill(this.data.loadDemographics());
  }

  // Unused
  async handleUpdate() {
  }

  // Returns true if the user's inputs were all valid; otherwise toasts and returns false.
  async save(): Promise<boolean> {
    // Save their answers so they can come back, even if they're not right.
    const d = this.collect();
    this.data.saveDemographics(d);

    // Validate required fields
    try {
      this.checkRequired('#ifcountry', 'Country is required.', !!d.country);
      this.checkRequired('#ifstate', 'State is required.', d.country !== 'USA' || !!d.state);
      this.checkRequired('#helperbox', 'Please tell us if someone will be helping you record.', d.hasHelper != undefined);
      this.checkRequired('#ifassistantemail', 'Please tell us how to email the person helping you.', !d.hasHelper || !!d.helperEmail);
      this.checkRequired('#ifformconsent', `You'll need to give consent to proceed.`, !!d.consentStorage);
      this.checkRequired('#ifconsentinitials', `Please write your initials next to your consent.`, !!d.consentInitials);
      this.checkRequired('#ifformtos', `You'll need to accept the terms to proceed.`, !!d.acceptTos);

    } catch (e) {
      if (e instanceof Error && e.message === 'form incomplete') {
        return false;
      } else {
        throw e;
      }
    }

    return true;
  }

  // Erases saved demographics and clears the form.
  clear() {
    // Overwrite all saved data and clear all form elements
    this.data.saveDemographics({});
    this.fill({});
  }

  // Focuses and styles the given selector with an error class if the given condition is false.
  private checkRequired(selector: string, message: string, check: boolean) {
    const elem = $(selector);
    elem.eclass('formerror', !check);
    if (!check) {
      this.app.showMessage(message, 'error');
      if (elem.get(0)) {
        elem.get(0)!.scrollIntoView();
      }
      elem.focus();
      throw new Error('form incomplete');
    }
  }

  // Fills the form elements with the given pre-existing demographics struct
  private fill(d: UserDemographics) {
    const setText = (id: string, t: string|undefined) => $(id).val(t ? t : '');
    const setBool = (id: string, val: boolean) => $(id).echecked(val);

    // Clear error states
    $('#ifcountry').eclass('formerror', false);
    $('#ifstate').eclass('formerror', false);
    $('#helperbox').eclass('formerror', false);
    $('#ifassistantemail').eclass('formerror', false);
    $('#ifformconsent').eclass('formerror', false);
    $('#ifconsentinitials').eclass('formerror', false);
    $('#ifformtos').eclass('formerror', false);

    // Identity and simple text demographic fields
    setText('#ifname', d.name);
    setText('#ifcountry', d.country);
    setText('#ifstate', d.state);
    setText('#ifcity', d.city);
    setText('#ifaccent', d.accent);
    setText('#ifreferral', d.referral);
    setText('#ifrace', d.race);
    setText('#ifassistantname', d.helperName);
    setText('#ifassistantemail', d.helperEmail);
    setText('#ifassistantrelationship', d.helperRelationship);
    setText('#ifotherinfo', d.otherInfo);

    // Optional state field
    $('#usstatebox').eshow(d.country === 'USA');

    // Gender radio buttons
    setBool('#ifgenderfemale', 'female' === d.gender);
    setBool('#ifgendermale', 'male' === d.gender);
    setBool('#ifgenderno', 'undisclosed' === d.gender);
    if (d.gender && !listhas(d.gender, 'female', 'male', 'undisclosed')) {
      setBool('#ifgenderother', true);
      setText('#ifgenderothertext', d.gender);
    } else {
      setBool('#ifgenderother', false);
    }

    // List of devices they have access to
    const deviceList = d.accessDevices ? d.accessDevices : [];
    setBool('#ifdevicecomputer', listhas('computer', ...deviceList));
    setBool('#ifdeviceandroid', listhas('androidphone', ...deviceList));
    setBool('#ifdeviceiphone', listhas('iphone', ...deviceList));
    setBool('#ifdevicenone', listhas('none', ...deviceList));
    setBool('#ifdeviceother', false);
    setText('#ifdeviceothertext', '');
    for (const device of deviceList) {
      if (!listhas(device, 'computer', 'androidphone', 'iphone', 'none', '')) {
        setBool('#ifdeviceother', true);
        setText('#ifdeviceothertext', device);
        break;
      }
    }

    // Helper radio button, which should also toggle the helper panel
    setBool('#ifhelperno', d.hasHelper === false);
    setBool('#ifhelperyes', d.hasHelper === true);
    $('#helpersection').eshow(!!d.hasHelper);

    // Never restore the consent stuff, always require it be re-entered
    $('#ifformconsent').echecked(false);
    $('#ifformtos').echecked(false);
    setText('#ifconsentinitials', '');

    // Auto-set defaults from Firestore Auth if the user hasn't entered anything
    const fbu = this.data.fbuser;
    if ($('#ifname').val() === '' && fbu && fbu.displayName) {
      $('#ifname').val(fbu.displayName);
    }
  }

  // Gathers all of the user's responses, valid or otherwise into a struct.
  private collect(): UserDemographics {
    return {
      name: this.collectText('#ifname'),
      country: this.collectText('#ifcountry'),
      state: this.collectText('#ifcountry') === 'USA' ? this.collectText('#ifstate') : undefined,
      city: this.collectText('#ifcity'),
      accent: this.collectText('#ifaccent'),
      referral: this.collectText('#ifreferral'),
      gender: this.collectGender(),
      race: this.collectText('#ifrace'),
      accessDevices: this.collectAccessDevices(),
      hasHelper: this.collectCheckbox('#ifhelperyes') ? true : this.collectCheckbox('#ifhelperno') ? false : undefined,
      helperName: this.collectText('#ifassistantname'),
      helperEmail: this.collectText('#ifassistantemail'),
      helperRelationship: this.collectText('#ifassistantrelationship'),
      consentStorage: this.collectCheckbox('#ifformconsent'),
      consentInitials: this.collectText('#ifconsentinitials'),
      acceptTos: this.collectCheckbox('#ifformtos'),
      otherInfo: this.collectText('#ifotherinfo'),
    };
  }

  private collectText(inputId: string): string {
    const text = $(inputId).val() as string;
    if (!text) {
      return '';
    } else {
      return text.trim();
    }
  }

  private collectCheckbox(inputId: string): boolean {
    return $(inputId).is(':checked');
  }

  private collectGender(): string {
    const hasOther = this.collectCheckbox('#ifgenderother');
    const otherText = this.collectText('#ifgenderothertext');

    if (this.collectCheckbox('#ifgendermale')) {
      return 'male';
    } else if (this.collectCheckbox('#ifgenderfemale')) {
      return 'female';
    } else if (this.collectCheckbox('#ifgenderno')) {
      return 'undisclosed';
    } else if (hasOther && otherText) {
      return otherText.trim();
    } else {
      return '';  // unanswered or prefer not to say
    }
  }

  private collectAccessDevices(): string[] {
    const result: string[] = [];
    if (this.collectCheckbox('#ifdeviceother')) {
      const otherText = this.collectText('#ifdeviceothertext');
      if (otherText) {
        result.push(otherText);
      }
    }

    if (this.collectCheckbox('#ifdevicecomputer')) {
      result.push('computer');
    }
    if (this.collectCheckbox('#ifdeviceandroid')) {
      result.push('androidphone');
    }
    if (this.collectCheckbox('#ifdeviceiphone')) {
      result.push('iphone');
    }
    if (this.collectCheckbox('#ifdevicenone')) {
      result.push('none');
    }
    return result;
  }
}
