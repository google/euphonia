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

export const HI_STRINGS: ELocaleString[] = [
  {
    key: `PAGE_TITLE`,
    en: `Project Euphonia`,
    description: `Web page title for all pages`,
    text: `प्रोजेक्ट यूफोनिया`
  },
  {
    key: `HELP_LINK`,
    description: `Help hyperlink HREF property when the user needs help or has questions.`,
    text: `http://g.co/disabilitysupport`
  },
  {
    key: `WELCOME_TITLE`,
    en: `Welcome to Project Euphonia!`,
    description: `Signup screen and consent screen titles`,
    text: `Project Euphonia में आपका स्वागत है!`
  },
  {
    key: `We're exploring how Google products and services
    that use speech as an input method could work better for more people. We're seeking
    voice contributions from adults who have difficulty being understood by others.
    Voice samples can help us improve how Google understands individuals with speech
    impairments.`,
    description: `Signup screen`,
    text: `हम ऐसे तरीके एक्सप्लोर कर रहे हैं जिनसे इनपुट के लिए बोली का इस्तेमाल करने वाले Google के प्रॉडक्ट और सेवाएं बेहतर हो सकें. साथ ही, इनका फ़ायदा ज़्यादा से ज़्यादा लोगों को मिले. हम ऐसे वयस्क लोगों से उनकी आवाज़ की रिकॉर्डिंग का योगदान चाहते हैं जिनकी बोली को लोग आसानी से नहीं समझ पाते. बोली के अलग-अलग सैंपल से, Google ऐसे लोगों की बात को बेहतर तरीके से समझ पाता है जिन्हें बोलने में परेशानी होती है.`
  },
  {
    key: `<b>IMPORTANT:</b> If you're filling out
    this form on behalf of someone else, please ensure you have their permission
    to do so.`,
    description: `Signup screen`,
    text: `<b>अहम जानकारी:</b> ऐसे लोग जो किसी और के लिए यह फ़ॉर्म भर रहे हैं, यह पक्का कर लें कि आपने उस व्यक्ति से फ़ॉर्म भरने की अनुमति ली है.`
  },
  {
    key: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    en: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    description: `Signup screen`,
    text: `क्या आपको कुछ पूछना है? 
        <a id=signuphelplink target="_blank"
        >हमसे संपर्क करें</a>`
  },
  {
    key: `Already enrolled? &nbsp;`,
    description: `Signup screen`,
    text: `क्या आपने पहले ही रजिस्टर कर लिया है? &nbsp;`
  },
  {
    key: `Click to sign in and continue recording`,
    description: `Signup screen`,
    text: `साइन इन करके रिकॉर्ड करने के लिए क्लिक करें`
  },
  {
    key: `To get started, please confirm your eligibility:`,
    description: `Signup screen`,
    text: `शुरू करने के लिए, कृपया ज़रूरी शर्तों की पुष्टि करें:`
  },
  {
    key: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`,
    description: `Signup screen eligibility question`,
    text: `अनजान लोगों या आवाज़ की पहचान करने वाली Google Assistant जैसी टेक्नोलॉजी को मेरी बात समझने में दिक्कत होती है. हालांकि, मेरे बोलने का लहजा इसकी वजह नहीं है`
  },
  {
    key: `I am at least 18 years of age`,
    description: `Signup screen eligibility question`,
    text: `मेरी उम्र 18 साल से कम नहीं है`
  },
  {
    key: `Sign in and continue`,
    description: `Signup screen button`,
    text: `साइन इन करें और जारी रखें`
  },
  {
    key: `You will need to sign in with your Google
    Account to contribute to the project. If you do not have a Google Account, you can
    create one when you click to continue.`,
    description: `Signup screen instructions`,
    text: `इस प्रोजेक्ट में योगदान देने के लिए आपको अपने Google खाते से साइन इन करना होगा. अगर आपके पास Google खाता नहीं है, तो 'जारी रखें' पर क्लिक करके नया खाता बनाएं.`
  },
  {
    key: `Next`,
    description: `Interest form button, advance to the next screen`,
    text: `आगे बढ़ें`
  },
  {
    key: `Go Back`,
    description: `Interest form button, go back to the signup screen`,
    text: `वापस जाएं`
  },
  {
    key: `You must type your name to agree to the terms.`,
    description: `Consent form screen, require consent to proceed`,
    text: `शर्तों से सहमत होने के लिए अपना नाम डालना ज़रूरी है.`
  },
  {
    key: `Reset form and start over`,
    description: `Interest form button, clear fields and start over`,
    text: `फ़ॉर्म रीसेट करें और फिर से शुरू करें`
  },
  {
    key: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
    Please review the following agreement: <span id=consentcounter></span>`,
    description: `Consent screen instructions`,
    text: `आपने <b id=whoisenrolling>&nbsp;</b> के तौर पर रजिस्टर किया है. कृपया यहां दिए गए कानूनी समझौते को पढ़ें: <span id=consentcounter></span>`
  },
  {
    key: `Enroll`,
    description: `Consent screen, final action; consents to the program and allows recording`,
    text: `रजिस्टर करें`
  },
  {
    key: `Next Agreement`,
    description: `Consent screen, to agree to the current consent and then see the next one. Only shows when there are multiple consents`,
    text: `अगला कानूनी समझौता`
  },
  {
    key: `INSTRUCTIONS_TITLE`,
    en: `Thanks for signing up for Project Euphonia!`,
    description: `Instructions screen title`,
    text: `Project Euphonia में साइन अप करने के लिए धन्यवाद!`
  },
  {
    key: `INSTRUCTIONS_VIDEO_HTML`,
    description: `Instructional video iframe from YouTube`,
    text: `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/sMLED9xrLts"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `,
  },
  {
    key: `INSTRUCTIONS_HTML`,
    en: `    <ul>
    <li>Please take a moment to watch this video introduction.</li>
    <li>On the next screen, you'll see <b>cards</b> to read aloud.</li>
    <li>You'll want to be in a <b>quiet setting</b> and avoid any background noise.</li>
    <li>You'll press the blue Record button, and then <b>read the
    card aloud</b>, as accurately as possible.</li>
    <li>When you are <b>finished speaking</b>, press the blue button again to stop recording.</li>
    <li>When you finish recording all the cards, you're done!</li>
    <li>Having trouble recording? <a target="_blank" href="http://g.co/disabilitysupport">Contact us</a> for help.</li>`,
    description: `Instructions screen details`,
    text: `<ul> 
    <li>कृपया थोड़ा समय निकालकर, इस प्रोजेक्ट के बारे में बताने वाला यह वीडियो देखें.</li> 
    <li>अगली स्क्रीन पर बोलकर पढ़ने के लिए आपको <b>कार्ड</b> दिखेंगे.</li> <li>आपको किसी <b>शांत जगह</b> पर रिकॉर्डिंग करनी चाहिए और बैकग्राउंड के शोर से बचना चाहिए.</li> 
    <li>नीले रंग का रिकॉर्ड बटन दबाएं और फिर जितना हो सके उतने सही तरीके से <b>कार्ड को बोलकर पढ़ें</b>.</li> 
    <li>कार्ड <b>पढ़ने के बाद</b>, रिकॉर्डिंग को बंद करने के लिए, नीले रंग का बटन दबाएं.</li> 
    <li>सभी कार्ड की रिकॉर्डिंग कर लेने का मतलब है कि आपका काम पूरा हुआ!</li> <li>क्या आपको रिकॉर्डिंग करने में समस्या आ रही है? सहायता के लिए <a target="_blank" href="http://g.co/disabilitysupport">हमसे संपर्क करें</a>.</li>`
  },
  {
    key: `Get Started`,
    description: `Instructions screen button to continue to next screen`,
    text: `शुरू करें`
  },
  {
    key: `Microphone Setup`,
    description: `Microphone and settings screen title`,
    text: `माइक्रोफ़ोन का सेटअप`
  },
  {
    key: `
    In order to record your speech, we need permission to use your microphone
    through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`,
    description: `Microphone permission instructions`,
    text: `आपकी बोली रिकॉर्ड करने के लिए, Euphonia को वेब ब्राउज़र पर माइक्रोफ़ोन ऐक्सेस करने की अनुमति देना ज़रूरी है. माइक्रोफ़ोन के इस्तेमाल की अनुमति देने के लिए, <b>कृपया "अनुमति दें" पर क्लिक करें</b>.`
  },
  {
    key: `
    We could not access your microphone due to a permission problem. You'll need to allow access
    in order to continue.`,
    description: `Microphone permission error message`,
    text: `अनुमति नहीं मिलने की वजह से Euphonia आपके माइक्रोफ़ोन को ऐक्सेस नहीं कर सका. जारी रखने के लिए आपको माइक्रोफ़ोन को ऐक्सेस करने की अनुमति देनी होगी.`
  },
  {
    key: `
    It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
    by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`,
    description: `Microphone permission error message`,
    text: `ऐसा लगता है कि आपके माइक्रोफ़ोन को ऐक्सेस करने की अनुमति नहीं है. आपको <b>ब्राउज़र के पता बार</b> में क्लिक करके <b>ऐक्सेस की अनुमति</b> देनी होगी और/या अपने माइक्रोफ़ोन के लिए <b>अनुमति रीसेट</b> करनी होगी.`
  },
  {
    key: `
    Your microphone is all set! You can start recording as soon as you're ready.`,
    description: `Microphone permission success message`,
    text: `आपके माइक्रोफ़ोन का इस्तेमाल किया जा सकता है! आप जब तैयार हों, तो रिकॉर्डिंग शुरू करें.`
  },
  {
    key: `Use the default microphone`,
    description: `Let's the user choose the browser's default recording device instead of picking one explicitly`,
    text: `डिफ़ॉल्ट माइक्रोफ़ोन का इस्तेमाल करें`
  },
  {
    key: `Save`,
    description: `Microphone configuration screen, accept changes to microphone device`,
    text: `सेव करें`
  },
  {
    key: `Try again`,
    description: `Microphone permission failure retry button`,
    text: `फिर से कोशिश करें`
  },
  {
    key: `Start recording!`,
    description: `Microphone setup screen button, continue to recording screen`,
    text: `रिकॉर्डिंग शुरू करें!`
  },
  {
    key: `Microphone settings`,
    description: `Microphone setup screen title`,
    text: `माइक्रोफ़ोन की सेटिंग`
  },
  {
    key: `Previous card`,
    description: `Recording screen button, go back to prior card`,
    text: `पिछला कार्ड`
  },
  {
    key: `Next card`,
    description: `Recording screen button, go forward to next card`,
    text: `अगला कार्ड`
  },
  {
    key: `Replay`,
    description: `Recording screen button, listen to previously recorded audio`,
    text: `फिर से चलाएं`
  },
  {
    key: `Stop`,
    description: `Recording screen button, to interrupt a recording that's currently being played back`,
    text: `बंद करें`
  },
  {
    key: `Delete`,
    description: `Recording screen button, delete a previous recording`,
    text: `मिटाएं`
  },
  {
    key: `Deleting...`,
    description: `Recording screen button, shown briefly while the recording is being deleted`,
    text: `मिटाया जा रहा है...`
  },
  {
    key: `Record`,
    description: `Recording screen button, record audio for a card`,
    text: `रिकॉर्ड करें`
  },
  {
    key: `Record Again`,
    description: `Recording screen button, record audio for a card that already has been recorded`,
    text: `फिर से रिकॉर्ड करें`
  },
  {
    key: `(this card is done)`,
    description: `Labels tasks that have already been recorded once`,
    text: `(आपने इस कार्ड की रिकॉर्डिंग कर ली है)`
  },
  {
    key: `Cancel`,
    description: `Recording screen button and microphone setting screen button, cancel recording / microphone changes`,
    text: `रद्द करें`
  },
  {
    key: `Done`,
    description: `Recording screen button, shown while recording to end the recording and start uploading it`,
    text: `हो गया`
  },
  {
    key: `Starting...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `शुरू हो रहा है...`
  },
  {
    key: `Now recording...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `रिकॉर्डिंग शुरू हो गई है...`
  },
  {
    key: `Recording uploaded!`,
    description: `Recording screen message when the recording uploaded successfully`,
    text: `रिकॉर्डिंग अपलोड की गई!`
  },
  {
    key: `Recording uploaded! Here's the next card.`,
    description: `Recording screen message when the recording uploads successfully and the next card is automatically displayed`,
    text: `रिकॉर्डिंग अपलोड की गई! यह रहा अगला कार्ड.`
  },
  {
    key: `Recording deleted.`,
    description: `Recording screen message when a recording has just been deleted`,
    text: `रिकॉर्डिंग मिटाई गई.`
  },
  {
    key: `Recording canceled.`,
    description: `Recording screen message when a recording has just been canceled`,
    text: `रिकॉर्डिंग रद्द हो गई.`
  },
  {
    key: `No recording to delete.`,
    description: `Error message when the user deletes but nothing is selected.`,
    text: `मिटाने के लिए कोई रिकॉर्डिंग उपलब्ध नहीं है.`
  },
  {
    key: `No recording to play.`,
    description: `Error message when the user replays but nothing is selected.`,
    text: `चलाने के लिए कोई रिकॉर्डिंग उपलब्ध नहीं है.`
  },
  {
    key: `Upload failed, your audio may not be saved.`,
    description: `Error message when the user's recording was not received by the server.`,
    text: `रिकॉर्डिंग अपलोड नहीं हुई, हो सकता है आपका ऑडियो सेव न हुआ हो.`
  },
  {
    key: `Canceling...`,
    description: `Recording screen button, shown briefly when the recording is being canceled`,
    text: `रद्द की जा रही है...`
  },
  {
    key: `Uploading...`,
    description: `Recording screen button, shown briefly when the recording is being uploaded`,
    text: `अपलोड हो रही है...`
  },
  {
    key: `?`,
    description: `Recording screen button, go to help screen`,
    text: `?`
  },
  {
    key: `&#x1F50A;`,
    description: `Speak prompt button, which uses computerized speech to play the prompt audibly`,
    text: `&#x1F50A;`
  },
  {
    key: `Continue`,
    description: `Sign up screen and consent screen buttons, continue to the next page`,
    text: `जारी रखें`
  },
  {
    key: `No assignments`,
    description: `Recording screen, message when the user has no cards to work on`,
    text: `कोई असाइनमेंट नहीं है`
  },
  {
    key: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`,
    description: `Recording screen, progress message of tasks completed so far`,
    text: `<b>{total_number_of_tasks_needed}</b> में से <b>{number_of_completed_cards}</b> कार्ड <b>रिकॉर्ड किए गए</b>`
  },
  {
    key: `Thank you!`,
    description: `Done screen title, shown when the user has finished at least one pass`,
    text: `धन्यवाद!`
  },
  {
    key: `          Great work! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards`,
    text: `बहुत बढ़िया! आपने सारे कार्ड एक बार देख लिए हैं और कुल <b>{total_number_of_tasks_needed} कार्ड</b> में से <b class=count>{number_of_completed_cards} कार्ड</b> को रिकॉर्ड कर लिया है. जब आप तैयार हों, तब बाकी बचे कार्ड को रिकॉर्ड करने के लिए नीचे दिया गया बटन दबाएं.`
  },
  {
    key: `          You're almost done! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards. This version displays when the user has done more than 75% of the work.`,
    text: `आपने करीब-करीब सभी कार्ड की रिकॉर्डिंग कर ली है! आपने सारे कार्ड एक बार देख लिए हैं और कुल <b>{total_number_of_tasks_needed} कार्ड</b> में से <b class=count>{number_of_completed_cards} कार्ड</b> को रिकॉर्ड कर लिया है. जब आप तैयार हों, तब बाकी बचे कार्ड को रिकॉर्ड करने के लिए नीचे दिया गया बटन दबाएं.`
  },
  {
    key: `Continue Recording`,
    description: `Done screen and instructions screen buttons, return to the recording screen`,
    text: `रिकॉर्डिंग जारी रखें`
  },
  {
    key: `Continue recording!`,
    description: `Microphone settings screen, return to the recording screen`,
    text: `रिकॉर्डिंग जारी रखें!`
  },
  {
    key: `You previously indicated that you are eligible.`,
    description: `Signup screen, a message showing that the participant has already completed this form`,
    text: `आपने पहले यह बताया था कि आप ज़रूरी शर्तें पूरी करते/करती हैं.`
  },
  {
    key: `You have already completed this form.`,
    description: `Interest form screen, a message showing that the participant has already completed this form`,
    text: `आपने यह फ़ॉर्म पहले ही भर दिया है.`
  },
  {
    key: `Country is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `देश का नाम डालना ज़रूरी है.`
  },
  {
    key: `State is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `राज्य का नाम डालना ज़रूरी है.`
  },
  {
    key: `Please tell us if someone will be helping you record.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `अगर रिकॉर्डिंग में कोई आपकी मदद करेगा, तो कृपया हमें इसकी जानकारी दें.`
  },
  {
    key: `Please tell us how to email the person helping you.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `जो व्यक्ति रिकॉर्डिंग में आपकी मदद करेगा कृपया उसका ईमेल पता दें.`
  },
  {
    key: `You'll need to give consent to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `आपको जारी रखने के लिए अपनी सहमति देनी होगी.`
  },
  {
    key: `Please write your initials next to your consent.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `कृपया अपनी सहमति के आगे अपने नाम का पहला अक्षर लिखें.`
  },
  {
    key: `You'll need to accept the terms to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `जारी रखने के लिए, आपको शर्तें स्वीकार करनी होंगी.`
  },
  {
    key: `You have already consented.`,
    description: `Consent screen, a message showing that the participant has already completed this form`,
    text: `आपने पहले ही सहमति दे दी है.`
  },
  {
    key: `By typing my name here, I agree to these terms:`,
    description: `Consent screen, indicates that the participant consents`,
    text: `अपना नाम लिखने का मतलब है कि मैं इन शर्तों से सहमत हूं:`
  },
  {
    key: `&nbsp;(Agreement {which_agreement_number} of {total_number_of_agreements})`,
    description: ``,
    text: `&nbsp;({total_number_of_agreements} में से {which_agreement_number} कानूनी समझौता)`
  },
  {
    key: `Congratulations! You're all done!`,
    description: `Progress bar display when there are no tasks left to do`,
    text: `बधाई हो! आपने सभी कार्ड की रिकॉर्डिंग कर ली है!`
  },
  {
    key: `Congratulations!`,
    description: `Title of the done screen`,
    text: `बधाई हो!`
  },
  {
    key: `Review Recordings (optional)`,
    description: `Button on done screen which returns to the recording screen, if the user wants to listen to recordings`,
    text: `रिकॉर्डिंग की समीक्षा करें (ज़रूरी नहीं)`
  },
  {
    key: `
    You have completed all your cards! We'll be reviewing them soon, and if everything
    looks good, you'll be receiving an email from rewards@perks.com within the next 7-10
    business days with a link to claim your gift card.
    <br/><br/>
    <b>Thank you for contributing <b class=count>{number_of_completed_cards} cards</b> to the project!</b>
    <br/><br/>
    (If you wish, you can now go back and review your recordings, but this is not necessary. <b>You're done!</b>)`,
    description: `Descriptive text on the done screen`,
    text: `आपने सभी कार्ड की रिकॉर्डिंग कर ली है! जल्द ही हम उनकी समीक्षा करेंगे और अगर हमें कोई समस्या नहीं मिली, तो rewards@perks.com से आपको एक ईमेल भेजा जाएगा. यह ईमेल, आपको 7 से 10 कामकाजी दिनों के अंदर मिलेगा. साथ ही, इसमें एक लिंक होगा जिसकी मदद से उपहार कार्ड का दावा किया जा सकता है. <br/><br/> <b>Project Euphonia में <b class=count>{number_of_completed_cards} कार्ड</b> का योगदान देने के लिए धन्यवाद!</b> <br/><br/> आपके पास पीछे जाकर अपनी रिकॉर्डिंग की समीक्षा करने का विकल्प है. हालांकि, ऐसा करना ज़रूरी नहीं है. <b>हो गया!</b>`
  },
  {
    key: `__INTEREST_FORM_HTML__`,
    description: `The HTML for the interest form; all HTML IDs must be intact exactly as is!`,

    // Each translatable string is on a line by itself to make it a little easier to translate
    text: `

    <div class=title
    >Google Project Euphonia में दिलचस्पी दिखाने से जुड़ा फ़ॉर्म</div>
    <div class=sectiontitle
    >आपके बारे में जानकारी</div>
    <div class=formbox>
    <div class=fieldname><label for=ifname
    >नाम</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <div class=fielddescription
    >कोई दूसरा नाम, नाम और सरनेम, सिर्फ़ नाम वगैरह. आपको जिस नाम से पुकारा जाना पसंद हो!</div>
    <input id=ifname class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifcountry
    >आपका निवास किस देश में है?</label>
    <span class=required>*</span></div>
    <div class=fielddescription
    >ज़रूरी सूचना, कृपया ध्यान दें: हमें खेद है कि तारे के निशान (*) के साथ नीचे दिए गए देशों के नागरिकों को हम इस समय उपहार कार्ड नहीं भेज सकते. अगर आपका निवास इनमें से किसी देश में है, तब भी हम आपका Project Euphonia रिसर्च में भाग लेने का स्वागत करते हैं. आने वाले समय में जब भी आपको उपहार कार्ड भेजे जा सकेंगे, हम आपको इसकी सूचना देंगे
    </div>
    <select id=ifcountry class=formselect>
    <option value="India">भारत</option>
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
    <div class=fieldname><label for=ifstate
    >आपका निवास किस देश या इलाके में है?</label>
    <span class=required>*</span></div>
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
    <div class=fieldname><label for=ifcity
    >आपका घर किस शहर में है?</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <input id=ifcity class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifaccent
    >आपको अपने बोलने के लहज़े को किस कैटगरी में रखना है?</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <input id=ifaccent class=formtext />
    </div>
    
    <div class=sectiontitle
    >ज़्यादा जानकारी</div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifreferral
    >कृपया हमें बताएं कि आपको इस प्रोजेक्ट के बारे में जानकारी कहां से मिली</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <input id=ifreferral class=formtext />
    </div>
    
    <div class=formbox role=radiogroup id=ifgendergroup style="display: none;">
    <div class=fieldname><label for=ifgendergroup
    >आपकी लैंगिक पहचान क्या है</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderfemale />
    <label for=ifgenderfemale
    >महिला</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgendermale />
    <label for=ifgendermale
    >पुरुष</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderno />
    <label for=ifgenderno
    >मुझे नहीं बताना</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderother />
    <label for=ifgenderother
    >अन्य:</label>
    <input type=text class=formtext id=ifgenderothertext />
    </div>
    </div>
    
    <div class=formbox style="display: none;">
    <div class=fieldname><label for=ifrace
    >आप किस नस्ल से हैं</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <input id=ifrace class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname
    >आपके पास इनमें से किन सुविधाओं का ऐक्सेस है?
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicecomputer />
    <label for=ifdevicecomputer
    >इंटरनेट कनेक्शन के साथ एक कंप्यूटर जिसमें माइक्रोफ़ोन और स्पीकर की सुविधा मौजूद हो</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceandroid />
    <label for=ifdeviceandroid
    >एक Android फ़ोन या टैबलेट, जैसे कि Samsung, Pixel, Nexus वगैरह</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceiphone />
    <label for=ifdeviceiphone
    >iPhone या iPad</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicenone />
    <label for=ifdevicenone
    >इनमें से कोई नहीं</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceother />
    <label for=ifdeviceother
    >अन्य:</label>
    <input type=text class=formtext id=ifdeviceothertext aria-labelledby="ifdeviceotherlabel" />
    </div>
    </div>
    
    <div class=formbox id=helperbox>
    <div class=fieldname
    >क्या बोली के सैंपल रिकॉर्ड करने में कोई आपकी मदद करेगा
    <span class=required>*</span></div>
    <div class=fielddescription
    >उदाहरण के लिए, परिवार का कोई सदस्य, बोली को बेहतर बनाने में मदद करने वाला चिकित्सक या कोई अन्य व्यक्ति</div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperno selected />
    <label for=ifhelperno
    >नहीं, मुझे इसके लिए किसी की मदद की ज़रूरत नहीं पड़ेगी</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperyes />
    <label for=ifhelperyes
    >हां, इसके लिए कोई मुझे मदद करेगा और उन्हें आपसे अपनी संपर्क जानकारी शेयर में कोई परेशानी नहीं है</label>
    </div>
    </div>
    
    <!-- Helper panel appears if the user chooses "yes" above -->
    <div id=helpersection>
    <div class=sectiontitle
    >आपकी मदद करने वाले व्यक्ति के बारे में जानकारी</div>
    <div class=formbox>
    <div class=fielddescription>
    कृपया हमें आपकी मदद करने वाले व्यक्ति के बारे में जानकारी दें, ताकि हम आप दोनों से संपर्क कर पाएं. मदद करने वाले व्यक्ति की जानकारी देने का मतलब है कि इस रिसर्च में आपके हिस्सा लेने से जुड़ी सभी जानकारी, उस व्यक्ति के साथ भी शेयर की जाएगी और आप इस बात से सहमत हैं. मदद करने वाले एक से ज़्यादा व्यक्तियों के नाम और उनके ईमेल पते दिए जा सकते हैं. हर नाम और ईमेल पते के बीच कॉमा ज़रूर लगाएं.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantname
    >मदद करने वाले व्यक्ति का नाम</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <input type=text class=formtext id=ifassistantname />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantemail
    >मदद करने वाले व्यक्ति का ईमेल पता</label>
    <span class=required>*</span></div>
    <input type=text class=formtext id=ifassistantemail />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantrelationship
    >इस व्यक्ति और आपके बीच क्या रिश्ता है?</label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <div class=fielddescription
    >उदाहरण के लिए: सहायक, दोस्त, परिवार का सदस्य, बोली को बेहतर बनाने में मदद करने वाला चिकित्सक वगैरह.</div>
    <input type=text class=formtext id=ifassistantrelationship />
    </div>
    </div>
    
    <div class=sectiontitle
    >Google Project Euphonia के लिए सहमति देने का फ़ॉर्म</div>
    
    <div class=forminfobox>
    <div class=fieldname
    >ऐसे सवालों की सूची जिनमें दी गई जानकारी संवेदनशील है. साथ ही, इस जानकारी से जवाब देने वाले व्यक्ति की पहचान की जा सकती है</div>
    <div class=fielddescription>
    ये सवाल पूछे जाने का मकसद, यह पता लगाना है कि रिसर्च में हिस्सा लेने वाला व्यक्ति, Google के इस डेटा कलेक्शन के लिए ज़रूरी शर्तें पूरी करता है या नहीं. Google इस डेटा का इस्तेमाल, बोली पहचानने वाली टेक्नोलॉजी से जुड़े अपने मौजूदा और आने वाले प्रॉडक्ट और सेवाओं को बेहतर बनाने के लिए करेगा. इसमें, इन प्रॉडक्ट और सेवाओं के लिए रिसर्च करना, इन्हें डिज़ाइन और डेवलप करना, इन्हें बनाना, और लोगों के लिए इनकी सुलभता को बेहतर करना शामिल है.
    ऐसा हो सकता है कि सवालों की इस सूची में दी गई जानकारी का इस्तेमाल, डेटा कलेक्शन के दौरान दी गई आपकी अन्य जानकारी और डेटा के साथ मिलाकर किया जाए. हालांकि, यह तभी होगा, जब आपको रिसर्च का हिस्सा बनने के लिए चुन लिया जाता है.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    सहमति मिलने के बाद, Google रिसर्च में हिस्सा ले रहे लोगों की निजी जानकारी को इकट्ठा और प्रोसेस करता है. डेटा कलेक्शन टास्क में हिस्सा लेने पर, लोगों की वही निजी जानकारी ली जाती है जिसके लिए वे अनुमति देते हैं. इसमें लोगों की, सहायक टेक्नोलॉजी के इस्तेमाल, नहीं बोल पाना या बोलने में होने वाली परेशानी, और बोलने के पैटर्न की जानकारी शामिल होती है. हालांकि, ऐसा तभी होता है, जब (क) लोग इन सवालों के जवाब सबमिट करते हैं और (ख) इस प्रोजेक्ट में हिस्सा लेने के लिए चुने जाते हैं.
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformconsent />
    <label for=ifformconsent>
    मैं इससे सहमत हूं और यहां अपने नाम का पहला अक्षर डालूंगा/डालूंगी:
    </label>
    <input type=text class=formtext id=ifconsentinitials aria-labelledby="ifformconsentlabel" />
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    कृपया हमारे नियम और शर्तें और हमारी निजता नीति देखें
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformtos />
    <label for=ifformtos>
    मैं नियम और शर्तों
    <a target="_blank" href="https://www.google.com/policies/terms/"
    >से सहमत हूं</a>
    और समझता/समझती हूं कि मेरी जानकारी का इस्तेमाल प्रॉडक्ट के लिए रिसर्च, डेवलपमेंट, और बोली से जुड़ी टेक्नोलॉजी को बेहतर बनाने के लिए किया जाएगा. साथ ही, यह Google की निजता नीति
    <a target="_blank" href="https://www.google.com/policies/privacy/"
    >के मुताबिक किया जाएगा</a>
    .
    </label>
    </div>
    </div>
    
    <div class=forminfobox>
    <div class=fieldname>
    इस फ़ॉर्म को सबमिट करने का मतलब है कि आपने Google और उसकी सहायक कंपनियों को, ईमेल से संपर्क करने की अनुमति दी है.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifotherinfo>
    क्या आपको कोई और जानकारी शेयर करनी है?
    </label>
    <span class=optional
    >(ज़रूरी नहीं)</span>
    </div>
    <input id=ifotherinfo class=formtext />
    </div>
    `
  },
];
