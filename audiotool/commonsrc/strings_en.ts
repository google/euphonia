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

import { ELocaleString } from './schema';

export const EN_STRINGS: ELocaleString[] = [
  {
    key: `Welcome to Project Euphonia!`,
    description: `Signup screen and consent screen titles`,
    text: `Welcome to Project Euphonia!`
  },
  {
    key: `We're exploring how Google products and services
          that use speech as an input method could work better for more people. We're seeking
          voice contributions from adults who have difficulty being understood by others.
          Voice samples can help us improve how Google understands individuals with speech
          impairments.`,
    description: `Signup screen`,
    text: `We're exploring how Google products and services
          that use speech as an input method could work better for more people. We're seeking
          voice contributions from adults who have difficulty being understood by others.
          Voice samples can help us improve how Google understands individuals with speech
          impairments.`
  },
  {
    key: `<b>IMPORTANT:</b> If you're filling out
          this form on behalf of someone else, please ensure you have their permission
          to do so.`,
    description: `Signup screen`,
    text: `<b>IMPORTANT:</b> If you're filling out
          this form on behalf of someone else, please ensure you have their permission
          to do so.`
  },
  {
    key: `Questions?
          <a target="_blank" href="mailto:euphonia-project@google.com">Contact Us</a>`,
    description: `Signup screen`,
    text: `Questions?
          <a target="_blank" href="mailto:euphonia-project@google.com">Contact Us</a>`
  },
  {
    key: `Already enrolled? &nbsp;`,
    description: `Signup screen`,
    text: `Already enrolled? &nbsp;`
  },
  {
    key: `Click to sign in and continue recording`,
    description: `Signup screen`,
    text: `Click to sign in and continue recording`
  },
  {
    key: `To get started, please confirm your eligibility:`,
    description: `Signup screen`,
    text: `To get started, please confirm your eligibility:`
  },
  {
    key: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`,
    description: `Signup screen eligibility question`,
    text: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`
  },
  {
    key: `I am at least 18 years of age`,
    description: `Signup screen eligibility question`,
    text: `I am at least 18 years of age`
  },
  {
    key: `Sign in and continue`,
    description: `Signup screen button`,
    text: `Sign in and continue`
  },
  {
    key: `You will need to sign in with your Google
         Account to contribute to the project. If you do not have a Google Account, you can
         create one when you click to continue.`,
    description: `Signup screen instructions`,
    text: `You will need to sign in with your Google
         Account to contribute to the project. If you do not have a Google Account, you can
         create one when you click to continue.`
  },
  {
    key: `Next`,
    description: `Interest form button, advance to the next screen`,
    text: `Next`
  },
  {
    key: `Go Back`,
    description: `Interest form button, go back to the signup screen`,
    text: `Go Back`
  },
  {
    key: `You must agree to the terms to continue.`,
    description: `Consent form screen, require consent to proceed`,
    text: `You must agree to the terms to continue.`
  },
  {
    key: `Reset form and start over`,
    description: `Interest form button, clear fields and start over`,
    text: `Reset form and start over`
  },
  {
    key: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
          Please review the following agreement: <span id=consentcounter></span>`,
    description: `Consent screen instructions`,
    text: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
          Please review the following agreement: <span id=consentcounter></span>`
  },
  {
    key: `Thanks for signing up for Project Euphonia!`,
    description: `Instructions screen title`,
    text: `Thanks for signing up for Project Euphonia!`
  },
  {
    key: `    <ul>
      <li>Please take a moment to watch this video introduction.</li>
      <li>On the next screen, you'll see <b>cards</b> to read aloud.</li>
      <li>You'll want to be in a <b>quiet setting</b> and avoid any background noise.</li>
      <li>You'll press the blue Record button, and then <b>read the
      card aloud</b>, as accurately as possible.</li>
      <li>When you are <b>finished speaking</b>, press the blue button again to stop recording.</li>
      <li>When you finish recording all the cards, you're done!</li>
      <li>Having trouble recording? <a target="_blank" href="http://g.co/disabilitysupport">Contact us</a> for help.</li>`,
    description: `Instructions screen details`,
    text: `    <ul>
      <li>Please take a moment to watch this video introduction.</li>
      <li>On the next screen, you'll see <b>cards</b> to read aloud.</li>
      <li>You'll want to be in a <b>quiet setting</b> and avoid any background noise.</li>
      <li>You'll press the blue Record button, and then <b>read the
      card aloud</b>, as accurately as possible.</li>
      <li>When you are <b>finished speaking</b>, press the blue button again to stop recording.</li>
      <li>When you finish recording all the cards, you're done!</li>
      <li>Having trouble recording? <a target="_blank" href="http://g.co/disabilitysupport">Contact us</a> for help.</li>`
  },
  {
    key: `Get Started`,
    description: `Instructions screen button to continue to next screen`,
    text: `Get Started`
  },
  {
    key: `Microphone Setup`,
    description: `Microphone and settings screen title`,
    text: `Microphone Setup`
  },
  {
    key: `
          In order to record your speech, Euphonia needs permission to use your microphone
          through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`,
    description: `Microphone permission instructions`,
    text: `
          In order to record your speech, Euphonia needs permission to use your microphone
          through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`
  },
  {
    key: `
          Euphonia could not access your microphone due to a permission problem. You'll need to allow access
          in order to continue.`,
    description: `Microphone permission error message`,
    text: `
          Euphonia could not access your microphone due to a permission problem. You'll need to allow access
          in order to continue.`
  },
  {
    key: `
          It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
          by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`,
    description: `Microphone permission error message`,
    text: `
          It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
          by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`
  },
  {
    key: `
          Your microphone is all set! You can start recording as soon as you're ready.`,
    description: `Microphone permission success message`,
    text: `
          Your microphone is all set! You can start recording as soon as you're ready.`
  },
  {
    key: `Try again`,
    description: `Microphone permission failure retry button`,
    text: `Try again`
  },
  {
    key: `Start recording!`,
    description: `Microphone setup screen button, continue to recording screen`,
    text: `Start recording!`
  },
  {
    key: `Microphone settings`,
    description: `Microphone setup screen title`,
    text: `Microphone settings`
  },
  {
    key: `Previous card`,
    description: `Recording screen button, go back to prior card`,
    text: `Previous card`
  },
  {
    key: `Next card`,
    description: `Recording screen button, go forward to next card`,
    text: `Next card`
  },
  {
    key: `Replay`,
    description: `Recording screen button, listen to previously recorded audio`,
    text: `Replay`
  },
  {
    key: `Stop`,
    description: `Recording screen button, to interrupt a recording that's currently being played back`,
    text: `Stop`
  },
  {
    key: `Delete`,
    description: `Recording screen button, delete a previous recording`,
    text: `Delete`
  },
  {
    key: `Record`,
    description: `Recording screen button, record audio for a card`,
    text: `Record`
  },
  {
    key: `Record Again`,
    description: `Recording screen button, record audio for a card that already has been recorded`,
    text: `Record Again`
  },
  {
    key: `(this card is done)`,
    description: `Labels tasks that have already been recorded once`,
    text: `(this card is done)`
  },
  {
    key: `Cancel`,
    description: `Recording screen button, cancel recording and don't upload`,
    text: `Cancel`
  },
  {
    key: `?`,
    description: `Recording screen button, go to help screen`,
    text: `?`
  },
  {
    key: `Continue`,
    description: `Sign up screen and consent screen buttons, continue to the next page`,
    text: `Continue`
  },
  {
    key: `No assignments`,
    description: `Recording screen, message when the user has no cards to work on`,
    text: `No assignments`
  },
  {
    key: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`,
    description: `Recording screen, progress message of tasks completed so far`,
    text: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`
  },
  {
    key: `Thank you!`,
    description: `Done screen title, shown when the user has finished at least one pass`,
    text: `Thank you!`
  },
  {
    key: `          Great work! You've gone through the cards once, and recorded
            <b class=count>{number_of_completed_cards} cards</b>
            out of the total (<b>{total_number_of_tasks_needed} cards</b>).
            When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards`,
    text: `          Great work! You've gone through the cards once, and recorded
            <b class=count>{number_of_completed_cards} cards</b>
            out of the total (<b>{total_number_of_tasks_needed} cards</b>).
            When you're ready, you can click the button below to finish up the rest of the cards.      `
  },
  {
    key: `Continue Recording`,
    description: `Done screen and instructions screen buttons, return to the recording screen`,
    text: `Continue Recording`
  },
  {
    key: `Continue recording!`,
    description: `Microphone settings screen, return to the recording screen`,
    text: `Continue recording!`
  },
  {
    key: `You previously indicated that you are eligible.`,
    description: `Signup screen, a message showing that the participant has already completed this form`,
    text: `You previously indicated that you are eligible.`
  },
  {
    key: `You have already completed this form.`,
    description: `Interest form screen, a message showing that the participant has already completed this form`,
    text: `You have already completed this form.`
  },
  {
    key: `Country is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Country is required.`
  },
  {
    key: `State is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `State is required.`
  },
  {
    key: `Please tell us if someone will be helping you record.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Please tell us if someone will be helping you record.`
  },
  {
    key: `Please tell us how to email the person helping you.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Please tell us how to email the person helping you.`
  },
  {
    key: `You'll need to give consent to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `You'll need to give consent to proceed.`
  },
  {
    key: `Please write your initials next to your consent.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Please write your initials next to your consent.`
  },
  {
    key: `You'll need to accept the terms to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `You'll need to accept the terms to proceed.`
  },
  {
    key: `You have already consented.`,
    description: `Consent screen, a message showing that the participant has already completed this form`,
    text: `You have already consented.`
  },
  {
    key: `I agree to the terms above`,
    description: `Consent screen, indicates that the participant consents`,
    text: `I agree to the terms above`
  },
  {
    key: `Congratulations! You're all done!`,
    description: `Progress bar display when there are no tasks left to do`,
    text: `Congratulations! You're all done!`
  },
  {
    key: `Congratulations!`,
    description: `Title of the done screen`,
    text: `Congratulations!`,
  },
  {
    key: `Review Recordings (optional)`,
    description: `Button on done screen which returns to the recording screen, if the user wants to listen to recordings`,
    text: `Review Recordings (optional)`
  },
  {
    key: `
        You have completed all your cards! We'll be reviewing them soon, and if everything
        looks good, you'll be receiving an email from rewards@perks.com within the next 7-10
        business days with a link to claim your gift card.
        <br/><br/>
        <b>Thank you for contributing <b class=count>{number_of_completed_cards} cards</b> to Project Euphonia!</b>
        <br/><br/>
        (If you wish, you can now go back and review your recordings, but this is not necessary. <b>You're done!</b>)`,
    description: `Descriptive text on the done screen`,
    text: `
        You have completed all your cards! We'll be reviewing them soon, and if everything
        looks good, you'll be receiving an email from rewards@perks.com within the next 7-10
        business days with a link to claim your gift card.
        <br/><br/>
        <b>Thank you for contributing <b class=count>{number_of_completed_cards} cards</b> to Project Euphonia!</b>
        <br/><br/>
        (If you wish, you can now go back and review your recordings, but this is not necessary. <b>You're done!</b>)`
  },
  {
    key: `__INTEREST_FORM_HTML__`,
    description: `The HTML for the interest form; all HTML IDs must be intact exactly as is!`,
    text: `
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
    </div>`    
  },
];