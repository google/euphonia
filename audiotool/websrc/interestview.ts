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
    insetBox.html(InterestView.FORM_HTML);
    $('#helpersection').hide();

    // State/country box conditional wiring
    $('#ifcountry').on('change', e => $('#usstatebox').eshow($('#ifcountry').val() === 'USA'));

    // Helper box conditional wiring
    const helperchangefn = e => {
      $('#helpersection').eshow($('#ifhelperyes').is(':checked'));
    };
    $('#ifhelperyes').on('change', helperchangefn);
    $('#ifhelperno').on('change', helperchangefn);

    const buttons = this.div.eadd('<div class=ifbuttons />');
    const nextButton = buttons.eadd('<button class=next>Next</button>');
    const backButton = buttons.eadd('<button>Go Back</button>');
    const clearButton = buttons.eadd('<button>Reset form and start over</button>');
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
  
  static FORM_HTML = `
<div class=title>Google Project Euphonia: Interest form</div>
<div class=sectiontitle>About You</div>
<div class=formbox>
  <div class=fieldname><label for=ifname>Name</label> <span class=optional>(Optional)</span></div>
  <div class=fielddescription>Nickname, first &amp; last name, just first name, etc.
      Any way you like to be addressed!</div>
  <input id=ifname class=formtext />
</div>

<div class=formbox>
  <div class=fieldname><label for=ifcountry>What country do you reside in?</label> <span class=required>*</span></div>
  <div class=fielddescription>IMPORTANT, PLEASE NOTE: We are regrettably unable to send gift cards at
      this time to residents of the countries indicated below with an asterisk (*). If you reside
      in one of these countries, you are still welcome to participate in Project Euphonia research,
      and we'll notify you if and when you'll be able to receive gift cards.
  </div>
  <select id=ifcountry class=formselect>
    <option value="USA">United States of America</option>
    <option value="* Afghanistan">* Afghanistan</option>
    <option value="* Albania">* Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Aruba">Aruba</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="* Bahamas, The">* Bahamas, The</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="* Barbados">* Barbados</option>
    <option value="* Belarus">* Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="* Benin">* Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="* Bosnia and Herzegovina">* Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Brunei">Brunei</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="* Burkina Faso">* Burkina Faso</option>
    <option value="* Burma">* Burma</option>
    <option value="* Burundi">* Burundi</option>
    <option value="* Cambodia">* Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cabo Verde">Cabo Verde</option>
    <option value="* Central African Republic">* Central African Republic</option>
    <option value="* Chad">* Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="* Colombia">* Colombia</option>
    <option value="* Comoros">* Comoros</option>
    <option value="* Congo, Democratic Republic of the">* Congo, Democratic Republic of the</option>
    <option value="* Congo, Republic of the">* Congo, Republic of the</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="* Cote d'Ivoire">* Cote d'Ivoire</option>
    <option value="Croatia">Croatia</option>
    <option value="* Cuba">* Cuba</option>
    <option value="Curacao">Curacao</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czechia">Czechia</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="* Dominican Republic">* Dominican Republic</option>
    <option value="East Timor (see Timor-Leste)">East Timor (see Timor-Leste)</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="* Equatorial Guinea">* Equatorial Guinea</option>
    <option value="* Eritrea">* Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Eswatini">Eswatini</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia, The">Gambia, The</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Grenada">Grenada</option>
    <option value="Guatemala">Guatemala</option>
    <option value="* Guinea">* Guinea</option>
    <option value="* Guinea-Bissau">* Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="* Haiti">* Haiti</option>
    <option value="Holy See">Holy See</option>
    <option value="Honduras">Honduras</option>
    <option value="Hong Kong">Hong Kong</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="* Iran">* Iran</option>
    <option value="* Iraq">* Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Korea, North">Korea, North</option>
    <option value="Korea, South">Korea, South</option>
    <option value="* Kosovo">* Kosovo</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="* Laos">* Laos</option>
    <option value="* Latvia">* Latvia</option>
    <option value="* Lebanon">* Lebanon</option>
    <option value="* Lesotho">* Lesotho</option>
    <option value="* Liberia">* Liberia</option>
    <option value="* Libya">* Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Macau">Macau</option>
    <option value="* Madagascar">* Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="* Mali">* Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Mauritania">Mauritania</option>
    <option value="* Mauritius">* Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="* Montenegro">* Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="* Nicaragua">* Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="* Nigeria">* Nigeria</option>
    <option value="* North Korea">* North Korea</option>
    <option value="* North Macedonia">* North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestinian Territories">Palestinian Territories</option>
    <option value="* Panama">* Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="* Russia">* Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="* Serbia">* Serbia</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Sint Maarten">Sint Maarten</option>
    <option value="Slovakia">Slovakia</option>
    <option value="* Slovenia">* Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="* Somalia">* Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
    <option value="* South Sudan">* South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="* Sudan">* Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Swaziland">Swaziland</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="* Syria">* Syria</option>
    <option value="Taiwan">Taiwan</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="* Tunisia">* Tunisia</option>
    <option value="* Turkey">* Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="* Uganda">* Uganda</option>
    <option value="* Ukraine">* Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="* Venezuela">* Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="* Zimbabwe">* Zimbabwe</option>
      </select>
</div>

<div class=formbox id=usstatebox>
  <div class=fieldname><label for=ifstate>What state or territory do you reside in?</label><span class=required>*</span></div>
  <select id=ifstate class=formselect>
    <option value=""></option>
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="AS">American Samoa</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="GU">Guam</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="MP">Northern Mariana Islands</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PA">Pennsylvania</option>
    <option value="PR">Puerto Rico</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="VI">U.S. Virgin Islands</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>          
  </select>
</div>

<div class=formbox>
  <div class=fieldname><label for=ifcity>What city do you live in?</label> <span class=optional>(Optional)</span></div>
  <input id=ifcity class=formtext />
</div>

<div class=formbox>
  <div class=fieldname><label for=ifaccent>How would you characterize your accent?</label> <span class=optional>(Optional)</span></div>
  <input id=ifaccent class=formtext />
</div>

<div class=sectiontitle>Additional information</div>

<div class=formbox>
  <div class=fieldname><label for=ifreferral>Please tell us how you heard about this project</label> <span class=optional>(Optional)</span></div>
  <input id=ifreferral class=formtext />
</div>

<div class=formbox role=radiogroup id=ifgendergroup style="display: none;">
  <div class=fieldname><label for=ifgendergroup>What is your gender</label> <span class=optional>(Optional)</span></div>
  <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderfemale />
    <label for=ifgenderfemale>Female</label>
  </div>
  <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgendermale />
    <label for=ifgendermale>Male</label>
  </div>
  <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderno />
    <label for=ifgenderno>Prefer not to say</label>
  </div>
  <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderother />
    <label for=ifgenderother>Other:</label>
    <input type=text class=formtext id=ifgenderothertext />
  </div>
</div>

<div class=formbox style="display: none;">
  <div class=fieldname><label for=ifrace>What is your race</label> <span class=optional>(Optional)</span></div>
  <input id=ifrace class=formtext />
</div>

<div class=formbox>
  <div class=fieldname>Which of these do you have access to? <span class=optional>(Optional)</span></div>
  <div class=checkboxrow>
    <input type=checkbox id=ifdevicecomputer />
    <label for=ifdevicecomputer>An internet-connected computer 
        equipped with a microphone and speakers</label>
  </div>
  <div class=checkboxrow>
    <input type=checkbox id=ifdeviceandroid />
    <label for=ifdeviceandroid>An Android phone or tablet (like a Samsung, Pixel, Nexus, etc.)</label>
  </div>
  <div class=checkboxrow>
    <input type=checkbox id=ifdeviceiphone />
    <label for=ifdeviceiphone>An iPhone or iPad</label>
  </div>
  <div class=checkboxrow>
    <input type=checkbox id=ifdevicenone />
    <label for=ifdevicenone>None of the above</label>
  </div>
  <div class=checkboxrow>
    <input type=checkbox id=ifdeviceother />
    <label for=ifdeviceother>Other:</label>
    <input type=text class=formtext id=ifdeviceothertext aria-label="Name of other device" />
  </div>
</div>

<div class=formbox id=helperbox>
  <div class=fieldname>Will someone be helping you record speech samples?<span class=required>*</span></div>
  <div class=fielddescription>For example, a family member, speech therapist, or other person</div>
  <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperno selected />
    <label for=ifhelperno>No, I'll be participating independently</label>
  </div>
  <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperyes />
    <label for=ifhelperyes>Yes, someone will be helping me and is comfortable with me sharing
        their contact info</label>
  </div>
</div>

<!-- Helper panel appears if the user chooses "yes" above -->
<div id=helpersection>
  <div class=sectiontitle>About the person helping you</div>
  <div class=formbox>
    <div class=fielddescription>
      Please tell us a bit about the person helping you, so we can best
      stay in touch with both of you. By including your assistant's name,
      you understand that they will receive information about your
      participation in this project. You can list more than one Assistant
      and email: just separate each one with a comma.
    </div>
  </div>

  <div class=formbox>
    <div class=fieldname><label for=ifassistantname>Assistant's name</label> <span class=optional>(Optional)</span></div>
    <input type=text class=formtext id=ifassistantname />
  </div>

  <div class=formbox>
    <div class=fieldname><label for=ifassistantemail>Assistant's email address</label> <span class=required>*</span></div>
    <input type=text class=formtext id=ifassistantemail />
  </div>

  <div class=formbox>
    <div class=fieldname><label for=ifassistantrelationship>
    What is this person's relationship to you?</label> <span class=optional>(Optional)</span></div>
    <div class=fielddescription>For example:  caregiver, friend, family member, speech therapist, etc.</div>
    <input type=text class=formtext id=ifassistantrelationship />
  </div>
</div>

<div class=sectiontitle>Google Project Euphonia: Consent</div>

<div class=forminfobox>
  <div class=fieldname>Questionnaire Collection of Sensitive Personally Identifiable Information</div>
  <div class=fielddescription>
    The purpose of this questionnaire is to verify your eligibility for an upcoming data collection effort
    with Google, and the collection's purpose will be to assist Google to design, research, develop, build,
    and improve the accessibility of its current and future products and services related to speech technologies.
    Information you provide in this questionnaire may be combined with other information and data that you chose
    to provide during the data collection, if you are selected to participate.
  </div>
</div>

<div class=formbox>
  <div class=fieldname>
    With your consent, Google will collect and process the personal information you choose to provide (a) when you submit this questionnaire and (b) if you are selected to participate in the project, when you participate in the data collection tasks, including information about your use of assistive technology, speech disability or impairment, and speech patterns.
    <span class=required>*</span>
  </div>
  <div class=checkboxrow>
    <input type=checkbox id=ifformconsent />
    <label for=ifformconsent>
      I give my consent, and will enter my initials here:
    </label>
    <input type=text class=formtext id=ifconsentinitials aria-label="Your initials" />
  </div>
</div>

<div class=formbox>
  <div class=fieldname>
    Please review our Terms and Conditions and Privacy Policy
    <span class=required>*</span>
  </div>
  <div class=checkboxrow>
    <input type=checkbox id=ifformtos />
    <label for=ifformtos>
      I accept the 
      <a target="_blank" href="https://www.google.com/policies/terms/">Terms and Conditions</a>
      and acknowledge that my information will be used for the product research, development, and improvement
      of speech related technologies, and in accordance with
      <a target="_blank" href="https://www.google.com/policies/privacy/">Google's Privacy Policy</a>.
    </label>
  </div>
</div>

<div class=forminfobox>
  <div class=fieldname>
    By submitting this form, you give Google and its affiliates your consent to contact you by email.
  </div>
</div>

<div class=formbox>
  <div class=fieldname><label for=ifotherinfo>
    Do you have any other information you would like to share with us?
    </label>
    <span class=optional>(Optional)</span>
  </div>
  <input id=ifotherinfo class=formtext />
</div>`;
}
