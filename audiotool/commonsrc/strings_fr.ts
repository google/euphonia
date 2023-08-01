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

export const FR_STRINGS: ELocaleString[] = [
  {
    key: `PAGE_TITLE`,
    en: `Project Euphonia`,
    description: `Web page title for all pages`,
    text: `Project Euphonia`
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
    text: `Bienvenue dans le projet Euphonia !`
  },
  {
    key: `We're exploring how Google products and services
    that use speech as an input method could work better for more people. We're seeking
    voice contributions from adults who have difficulty being understood by others.
    Voice samples can help us improve how Google understands individuals with speech
    impairments.`,
    description: `Signup screen`,
    text: `Nous étudions comment les produits et les services Google qui utilisent la saisie vocale pourraient être améliorés. Nous sommes à la recherche de contributions vocales provenant d'adultes avec des difficultés à se faire comprendre. Ces échantillons vocaux peuvent nous aider à améliorer la compréhension de Google des personnes souffrant de troubles de la parole.`
  },
  {
    key: `<b>IMPORTANT:</b> If you're filling out
    this form on behalf of someone else, please ensure you have their permission
    to do so.`,
    description: `Signup screen`,
    text: `<b>IMPORTANT</b> : Si vous remplissez ce formulaire au nom de quelqu'un d'autre, merci de vous assurer que vous avez son autorisation.`
  },
  {
    key: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    en: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    description: `Signup screen`,
    text: `Des questions ? 
        <a id=signuphelplink target="_blank"
        >Nous contacter</a>`
  },
  {
    key: `Already enrolled? &nbsp;`,
    description: `Signup screen`,
    text: `Déjà inscrit ? &nbsp;`
  },
  {
    key: `Click to sign in and continue recording`,
    description: `Signup screen`,
    text: `Cliquez pour vous connecter et continuer à enregistrer`
  },
  {
    key: `To get started, please confirm your eligibility:`,
    description: `Signup screen`,
    text: `Pour commencer, veuillez confirmer votre éligibilité :`
  },
  {
    key: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`,
    description: `Signup screen eligibility question`,
    text: `Les inconnus ou les technologies utilisant la reconnaissance vocale comme l'Assistant Google ont des difficultés à comprendre ce que je dis (pas à cause d'un accent)`
  },
  {
    key: `I am at least 18 years of age`,
    description: `Signup screen eligibility question`,
    text: `J'ai au moins 18 ans`
  },
  {
    key: `Sign in and continue`,
    description: `Signup screen button`,
    text: `Se connecter et continuer`
  },
  {
    key: `You will need to sign in with your Google
    Account to contribute to the project. If you do not have a Google Account, you can
    create one when you click to continue.`,
    description: `Signup screen instructions`,
    text: `Vous devrez vous connecter avec votre compte Google pour contribuer à ce projet. Si vous n'avez pas de compte Google, vous pourrez en créer un en cliquant pour continuer.`
  },
  {
    key: `Next`,
    description: `Interest form button, advance to the next screen`,
    text: `Suivant`
  },
  {
    key: `Go Back`,
    description: `Interest form button, go back to the signup screen`,
    text: `Retour`
  },
  {
    key: `You must type your name to agree to the terms.`,
    description: `Consent form screen, require consent to proceed`,
    text: `Vous devez saisir votre nom pour accepter les conditions.`
  },
  {
    key: `Reset form and start over`,
    description: `Interest form button, clear fields and start over`,
    text: `Recommencer le formulaire depuis le début`
  },
  {
    key: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
    Please review the following agreement: <span id=consentcounter></span>`,
    description: `Consent screen instructions`,
    text: `Vous allez être inscrit en tant que <b id=whoisenrolling>&nbsp;</b>. Veuillez consulter le contrat suivant : <span id=consentcounter></span>`
  },
  {
    key: `Enroll`,
    description: `Consent screen, final action; consents to the program and allows recording`,
    text: `S'inscrire`
  },
  {
    key: `Next Agreement`,
    description: `Consent screen, to agree to the current consent and then see the next one. Only shows when there are multiple consents`,
    text: `Contrat suivant`
  },
  {
    key: `INSTRUCTIONS_TITLE`,
    en: `Thanks for signing up for Project Euphonia!`,
    description: `Instructions screen title`,
    text: `Merci de vous être inscrit dans le projet Euphonia !`
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
      <li>Merci de prendre quelques minutes pour visionner cette présentation vidéo.</li>
      <li>Sur l'écran suivant, vous devrez lire des <b>fiches</b> à voix haute.</li> 
      <li>Pour ce faire, trouvez un <b>endroit calme</b> et sans bruits de fond.</li> 
      <li>Après avoir appuyé sur le bouton d'enregistrement (de couleur bleue), <b>lisez la fiche à voix haute</b> aussi précisément que possible.</li> 
      <li>Lorsque vous avez <b>terminé de parler</b>, appuyez à nouveau sur le bouton bleu pour finir l'enregistrement.</li> <li>Une fois un échantillon enregistré pour chacune des fiches, vous aurez terminé !</li> <li>Vous rencontrez des problèmes d'enregistrement ? <a target="_blank" href="http://g.co/disabilitysupport">Contactez-nous</a> pour obtenir de l'aide.</li>`
  },
  {
    key: `Get Started`,
    description: `Instructions screen button to continue to next screen`,
    text: `Commencer`
  },
  {
    key: `Microphone Setup`,
    description: `Microphone and settings screen title`,
    text: `Configuration du micro`
  },
  {
    key: `
    In order to record your speech, we need permission to use your microphone
    through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`,
    description: `Microphone permission instructions`,
    text: `Afin d'enregistrer votre voix, Euphonia nécessite l'autorisation d'utiliser votre micro depuis votre navigateur. <b>Veuillez cliquer sur "Autoriser"</b> pour autoriser l'utilisation du micro.`
  },
  {
    key: `
    We could not access your microphone due to a permission problem. You'll need to allow access
    in order to continue.`,
    description: `Microphone permission error message`,
    text: `Euphonia n'a pas pu accéder à votre micro en raison d'un problème d'autorisation. Vous devez autoriser l'accès au micro pour continuer.`
  },
  {
    key: `
    It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
    by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`,
    description: `Microphone permission error message`,
    text: `Il semblerait que l'autorisation d'accès au micro n'est pas disponible. Merci d'<b>autoriser l'accès</b> en cliquant sur la <b>barre d'adresse de votre navigateur</b>, et/ou en <b>réinitialisant l'autorisation</b> de votre micro.`
  },
  {
    key: `
    Your microphone is all set! You can start recording as soon as you're ready.`,
    description: `Microphone permission success message`,
    text: `Votre micro est prêt à l'emploi ! L'enregistrement peut commencer quand vous le souhaitez.`
  },
  {
    key: `Use the default microphone`,
    description: `Let's the user choose the browser's default recording device instead of picking one explicitly`,
    text: `Utiliser le micro par défaut`
  },
  {
    key: `Save`,
    description: `Microphone configuration screen, accept changes to microphone device`,
    text: `Sauvegarder`
  },
  {
    key: `Try again`,
    description: `Microphone permission failure retry button`,
    text: `Réessayer`
  },
  {
    key: `Start recording!`,
    description: `Microphone setup screen button, continue to recording screen`,
    text: `Lancez l'enregistrement !`
  },
  {
    key: `Microphone settings`,
    description: `Microphone setup screen title`,
    text: `Paramètres du micro`
  },
  {
    key: `Previous card`,
    description: `Recording screen button, go back to prior card`,
    text: `Fiche précédente`
  },
  {
    key: `Next card`,
    description: `Recording screen button, go forward to next card`,
    text: `Fiche suivante`
  },
  {
    key: `Replay`,
    description: `Recording screen button, listen to previously recorded audio`,
    text: `Rejouer`
  },
  {
    key: `Stop`,
    description: `Recording screen button, to interrupt a recording that's currently being played back`,
    text: `Stop`
  },
  {
    key: `Delete`,
    description: `Recording screen button, delete a previous recording`,
    text: `Supprimer`
  },
  {
    key: `Deleting...`,
    description: `Recording screen button, shown briefly while the recording is being deleted`,
    text: `Suppression…`
  },
  {
    key: `Record`,
    description: `Recording screen button, record audio for a card`,
    text: `Enregistrer`
  },
  {
    key: `Record Again`,
    description: `Recording screen button, record audio for a card that already has been recorded`,
    text: `Réenregistrer`
  },
  {
    key: `(this card is done)`,
    description: `Labels tasks that have already been recorded once`,
    text: `(cette fiche est terminée)`
  },
  {
    key: `Cancel`,
    description: `Recording screen button and microphone setting screen button, cancel recording / microphone changes`,
    text: `Annuler`
  },
  {
    key: `Done`,
    description: `Recording screen button, shown while recording to end the recording and start uploading it`,
    text: `OK`
  },
  {
    key: `Starting...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `Démarrage…`
  },
  {
    key: `Now recording...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `Enregistrement en cours…`
  },
  {
    key: `Recording uploaded!`,
    description: `Recording screen message when the recording uploaded successfully`,
    text: `Enregistrement importé !`
  },
  {
    key: `Recording uploaded! Here's the next card.`,
    description: `Recording screen message when the recording uploads successfully and the next card is automatically displayed`,
    text: `Enregistrement importé ! C'est parti pour la fiche suivante.`
  },
  {
    key: `Recording deleted.`,
    description: `Recording screen message when a recording has just been deleted`,
    text: `Enregistrement supprimé.`
  },
  {
    key: `Recording canceled.`,
    description: `Recording screen message when a recording has just been canceled`,
    text: `Enregistrement annulé.`
  },
  {
    key: `No recording to delete.`,
    description: `Error message when the user deletes but nothing is selected.`,
    text: `Aucun enregistrement à supprimer.`
  },
  {
    key: `No recording to play.`,
    description: `Error message when the user replays but nothing is selected.`,
    text: `Aucun enregistrement à jouer.`
  },
  {
    key: `Upload failed, your audio may not be saved.`,
    description: `Error message when the user's recording was not received by the server.`,
    text: `L'importation a échoué, votre enregistrement peut ne pas être sauvegardé.`
  },
  {
    key: `Canceling...`,
    description: `Recording screen button, shown briefly when the recording is being canceled`,
    text: `Annulation…`
  },
  {
    key: `Uploading...`,
    description: `Recording screen button, shown briefly when the recording is being uploaded`,
    text: `Importation…`
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
    text: `Continuer`
  },
  {
    key: `No assignments`,
    description: `Recording screen, message when the user has no cards to work on`,
    text: `Aucune attribution`
  },
  {
    key: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`,
    description: `Recording screen, progress message of tasks completed so far`,
    text: `<b>{number_of_completed_cards}</b> sur <b>{total_number_of_tasks_needed}</b> fiche(s) <b>terminée(s)</b>`
  },
  {
    key: `Thank you!`,
    description: `Done screen title, shown when the user has finished at least one pass`,
    text: `Merci !`
  },
  {
    key: `          Great work! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards`,
    text: `Bravo ! Vous avez fait le tour des fiches et enregistré un échantillon pour <b class=count>{number_of_completed_cards} fiches</b> (sur un total de <b>{total_number_of_tasks_needed} fiches</b>). Lorsque vous êtes prêt, cliquez sur le bouton situé ci-dessous pour procéder à l'enregistrement du reste des fiches.`
  },
  {
    key: `          You're almost done! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards. This version displays when the user has done more than 75% of the work.`,
    text: `Vous avez presque terminé ! Vous avez fait le tour des fiches et enregistré un échantillon pour <b class=count>{number_of_completed_cards} fiches</b> (sur un total de <b>{total_number_of_tasks_needed} fiches</b>). Lorsque vous êtes prêt, cliquez sur le bouton situé ci-dessous pour procéder à l'enregistrement du reste des fiches.`
  },
  {
    key: `Continue Recording`,
    description: `Done screen and instructions screen buttons, return to the recording screen`,
    text: `Continuer d'enregistrer`
  },
  {
    key: `Continue recording!`,
    description: `Microphone settings screen, return to the recording screen`,
    text: `Continuer d'enregistrer !`
  },
  {
    key: `You previously indicated that you are eligible.`,
    description: `Signup screen, a message showing that the participant has already completed this form`,
    text: `Vous avez déjà confirmé votre éligibilité.`
  },
  {
    key: `You have already completed this form.`,
    description: `Interest form screen, a message showing that the participant has already completed this form`,
    text: `Vous avez déjà complété ce formulaire.`
  },
  {
    key: `Country is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Veuillez saisir un pays.`
  },
  {
    key: `State is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Veuillez indiquer l'état.`
  },
  {
    key: `Please tell us if someone will be helping you record.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Veuillez indiquer si quelqu'un vous aidera à enregistrer.`
  },
  {
    key: `Please tell us how to email the person helping you.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Merci de nous indiquer comment contacter cette personne par e-mail.`
  },
  {
    key: `You'll need to give consent to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Vous devrez donner votre accord avant de commencer.`
  },
  {
    key: `Please write your initials next to your consent.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Veuillez saisir vos initiales à côté de votre autorisation.`
  },
  {
    key: `You'll need to accept the terms to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Vous devrez accepter les conditions avant de commencer.`
  },
  {
    key: `You have already consented.`,
    description: `Consent screen, a message showing that the participant has already completed this form`,
    text: `Vous avez déjà donné votre autorisation.`
  },
  {
    key: `By typing my name here, I agree to these terms:`,
    description: `Consent screen, indicates that the participant consents`,
    text: `En inscrivant mon nom ici, j'accepte les conditions suivantes :`
  },
  {
    key: `&nbsp;(Agreement {which_agreement_number} of {total_number_of_agreements})`,
    description: ``,
    text: `&nbsp;(Contrat {which_agreement_number} sur {total_number_of_agreements})`
  },
  {
    key: `Congratulations! You're all done!`,
    description: `Progress bar display when there are no tasks left to do`,
    text: `Félicitations, vous avez terminé !`
  },
  {
    key: `Congratulations!`,
    description: `Title of the done screen`,
    text: `Félicitations !`
  },
  {
    key: `Review Recordings (optional)`,
    description: `Button on done screen which returns to the recording screen, if the user wants to listen to recordings`,
    text: `Passer les enregistrements en revue (facultatif)`
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
    text: `Vous avez terminé l'intégralité des fiches ! Nous examinerons vos enregistrements dans les plus brefs délais, et si tout semble correct, vous recevrez un e-mail de rewards@perks.com d'ici 7 à 10 jours ouvrés contenant un lien pour obtenir votre carte cadeau. <br/><br/> <b>Un grand merci pour votre contribution sur <b class=count>{number_of_completed_cards} cartes</b> pour le projet Euphonia !</b> <br/><br/> (Si vous le souhaitez, et bien que cela ne soit pas nécessaire, il vous est maintenant possible de revenir en arrière et de passer vos enregistrements en revue. <b>Vous avez terminé !</b>)`
  },
  {
    key: `__INTEREST_FORM_HTML__`,
    description: `The HTML for the interest form; all HTML IDs must be intact exactly as is!`,

    // Each translatable string is on a line by itself to make it a little easier to translate
    text: `

    <div class=title
    >Google projet Euphonia : formulaire de participation</div>
    <div class=sectiontitle
    >À propos de vous</div>
    <div class=formbox>
    <div class=fieldname><label for=ifname
    >Nom</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <div class=fielddescription
    >Surnom, prénom et nom de famille, prénom uniquement, etc. Dites-nous comment vous préférez que l'on s'adresse à vous !</div>
    <input id=ifname class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifcountry
    >Dans quel pays vivez-vous ?</label>
    <span class=required>*</span></div>
    <div class=fielddescription
    >IMPORTANT, VEUILLEZ NOTER : Nous sommes malheureusement dans l'impossibilité d'envoyer des cartes cadeaux aux résidents des pays ci-dessous suivis d'un astérisque (*). Si vous résidez au sein d'un des pays concernés, il vous est toujours possible de participer au projet Euphonia. Nous vous informerons si et quand vous serez éligibles à des cartes cadeaux.
    </div>
    <select id=ifcountry class=formselect>
    <option value="France">France</option>
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
    <div class=fieldname><label for=ifstate
    >Dans quel état ou territoire vivez-vous ?</label>
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
    >Dans quelle ville vivez-vous ?</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <input id=ifcity class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifaccent
    >Comment décririez-vous votre accent ?</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <input id=ifaccent class=formtext />
    </div>
    
    <div class=sectiontitle
    >Informations supplémentaires</div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifreferral
    >Veuillez nous indiquer comment vous avez eu vent de ce projet</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <input id=ifreferral class=formtext />
    </div>
    
    <div class=formbox role=radiogroup id=ifgendergroup style="display: none;">
    <div class=fieldname><label for=ifgendergroup
    >Quel est votre genre ?</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderfemale />
    <label for=ifgenderfemale
    >Femme</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgendermale />
    <label for=ifgendermale
    >Homme</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderno />
    <label for=ifgenderno
    >Je ne souhaite pas le préciser</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderother />
    <label for=ifgenderother
    >Autre :</label>
    <input type=text class=formtext id=ifgenderothertext />
    </div>
    </div>
    
    <div class=formbox style="display: none;">
    <div class=fieldname><label for=ifrace
    >De quelle origine ethnique êtes-vous ?</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <input id=ifrace class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname
    >À quel type d'équipement(s) avez-vous accès ?
    <span class=optional
    >(Facultatif)</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicecomputer />
    <label for=ifdevicecomputer
    >Un ordinateur doté d'un accès Internet, et équipé d'un micro et d'enceintes</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceandroid />
    <label for=ifdeviceandroid
    >Un téléphone ou une tablette Android (comme un Samsung, un Pixel, un Nexus, etc.)</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceiphone />
    <label for=ifdeviceiphone
    >Un iPhone ou un iPad</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicenone />
    <label for=ifdevicenone
    >Aucune des réponses ci-dessus</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceother />
    <label for=ifdeviceother
    >Autre :</label>
    <input type=text class=formtext id=ifdeviceothertext aria-labelledby="ifdeviceotherlabel" />
    </div>
    </div>
    
    <div class=formbox id=helperbox>
    <div class=fieldname
    >Quelqu'un vous aidera-t-il à enregistrer les échantillons audio ?
    <span class=required>*</span></div>
    <div class=fielddescription
    >Par exemple, un membre de la famille, un orthophoniste, ou toute autre personne</div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperno selected />
    <label for=ifhelperno
    >Non, je participe de manière indépendante</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperyes />
    <label for=ifhelperyes
    >Oui, quelqu'un m'aidera et m'autorise à partager ses coordonnées</label>
    </div>
    </div>
    
    <!-- Helper panel appears if the user chooses "yes" above -->
    <div id=helpersection>
    <div class=sectiontitle
    >À propos de votre assistant</div>
    <div class=formbox>
    <div class=fielddescription>
    Merci de nous parler de la personne qui vous accompagne, afin que nous puissions tous mieux rester en contact. En indiquant le nom de votre assistant, vous acceptez qu'il reçoive des informations à propos de votre participation à ce projet. Vous pouvez indiquer plusieurs personnes et adresses e-mail : séparez-les simplement avec une virgule.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantname
    >Nom de l'assistant</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <input type=text class=formtext id=ifassistantname />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantemail
    >Adresse e-mail de l'assistant</label>
    <span class=required>*</span></div>
    <input type=text class=formtext id=ifassistantemail />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantrelationship
    >Quelle est la relation entre cette personne et vous ?</label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <div class=fielddescription
    >Par exemple : soignant, ami, membre de la famille, orthophoniste, etc.</div>
    <input type=text class=formtext id=ifassistantrelationship />
    </div>
    </div>
    
    <div class=sectiontitle
    >Projet Euphonia de Google : Consentement</div>
    
    <div class=forminfobox>
    <div class=fieldname
    >Collecte par questionnaire d'informations personnelles sensibles</div>
    <div class=fielddescription>
    L'objectif de ce questionnaire est de confirmer votre éligibilité à une collecte de données à venir menée par Google. L'objectif de cette collecte sera d'aider Google à concevoir, rechercher, développer et améliorer l'accessibilité de ses produits et services actuels comme futurs liés à la reconnaissance vocale.
    Les informations fournies lors de ce questionnaire pourront être combinées à d'autres informations et données que vous avez choisi de partager durant la collecte de donnée, si vous êtes sélectionné.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Avec votre accord, Google procédera à la collecte et au traitement des informations personnelles que vous avez choisi de partager (a) en soumettant ce questionnaire, et (b) si vous êtes sélectionné pour ce projet, lorsque vous participez à des tâches de collecte de données, y compris les informations concernant votre usage des technologies d'assistance, vos troubles de la parole et votre manière de parler.
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformconsent />
    <label for=ifformconsent>
    En inscrivant mes initiales ici, je donne mon consentement :
    </label>
    <input type=text class=formtext id=ifconsentinitials aria-labelledby="ifformconsentlabel" />
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Veuillez examiner nos conditions d'utilisation et nos règles de confidentialité
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformtos />
    <label for=ifformtos>
    J'accepte les
    <a target="_blank" href="https://www.google.com/policies/terms/"
    >Conditions d'utilisation</a>
    et j'accepte que mes informations soient utilisées pour la recherche produit, le développement et l'amélioration de technologies utilisant la reconnaissance vocale, conformément aux
    <a target="_blank" href="https://www.google.com/policies/privacy/"
    >Règles de confidentialité de Google</a>
    .
    </label>
    </div>
    </div>
    
    <div class=forminfobox>
    <div class=fieldname>
    En soumettant ce formulaire, vous acceptez que Google et ses sociétés affiliées vous contactent par e-mail.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifotherinfo>
    Y a-t-il d'autres informations que vous souhaiteriez partager avec nous ?
    </label>
    <span class=optional
    >(Facultatif)</span>
    </div>
    <input id=ifotherinfo class=formtext />
    </div>
`
  },
];
