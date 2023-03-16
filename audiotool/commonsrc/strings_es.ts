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

export const ES_STRINGS: ELocaleString[] = [
  {
    key: `Welcome to Project Euphonia!`,
    description: `Signup screen and consent screen titles`,
    text: `¡Bienvenido al Proyecto Euphonia!`
  },
  {
    key: `We're exploring how Google products and services
  that use speech as an input method could work better for more people. We're seeking
  voice contributions from adults who have difficulty being understood by others.

  Voice samples can help us improve how Google understands individuals with speech
  impairments.`,
    description: `Signup screen`,
    text: `
    Exploramos cómo los productos y servicios de Google que utilizan la voz como método de entrada podrían funcionar mejor para más usuarios.
    
    Estamos buscando contribuciones de voz de adultos que tienen dificultades para ser entendidos por otros.
    
    Las muestras de voz pueden ayudarnos a mejorar la forma en que Google entiende a las personas con problemas del habla.
    `
  },
  {
    key: `<b>IMPORTANT:</b> If you're filling out
  this form on behalf of someone else, please ensure you have their permission
  to do so.`,
    description: `Signup screen`,
    text: `
     <b>IMPORTANTE:</b> si está completando este formulario en nombre de otra persona, asegúrese de tener su permiso para hacerlo. 
    `
  },
  {
    key: `Questions?
  <a target="_blank" href="mailto:euphonia-project@google.com">Contact Us</a>`,
    description: `Signup screen`,
    text: `¿Preguntas?
        <a target="_blank" href="mailto:euphonia-project@google.com"
        > contáctenos</a>`
  },
  {
    key: `Already enrolled? &nbsp;`,
    description: `Signup screen`,
    text: `Ya inscrito? &nbsp;`
  },
  {
    key: `Click to sign in and continue recording`,
    description: `Signup screen`,
    text: `Haga clic para iniciar sesión y continuar grabando`
  },
  {
    key: `To get started, please confirm your eligibility:`,
    description: `Signup screen`,
    text: `Para comenzar, por favor confirmar...`
  },
  {
    key: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`,
    description: `Signup screen eligibility question`,
    text: `
    A las personas que acabo de conocer o a las personas extrañas les resulta difícil entender mi habla (no por el acento)
    `
  },
  {
    key: `I am at least 18 years of age`,
    description: `Signup screen eligibility question`,
    text: `Soy mayor de 18 años.`
  },
  {
    key: `Sign in and continue`,
    description: `Signup screen button`,
    text: `Iniciar sesión y continuar`
  },
  {
    key: `You will need to sign in with your Google
  Account to contribute to the project. If you do not have a Google Account, you can
  create one when you click to continue.`,
    description: `Signup screen instructions`,
    text: `Deberá iniciar sesión con su cuenta de Google para contribuir al proyecto.
        Si no tiene una cuenta de Google, puede crear una cuando haga clic para continuar.`
  },
  {
    key: `Next`,
    description: `Interest form button, advance to the next screen`,
    text: `Próximo`
  },
  {
    key: `Go Back`,
    description: `Interest form button, go back to the signup screen`,
    text: `Regresa`
  },
  {
    key: `You must agree to the terms to continue.`,
    description: `Consent form screen, require consent to proceed`,
    text: `Debe aceptar los términos para continuar.`
  },
  {
    key: `Reset form and start over`,
    description: `Interest form button, clear fields and start over`,
    text: `Reiniciar el formulario y comenzar de nuevo`
  },
  {
    key: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
  Please review the following agreement: <span id=consentcounter></span>`,
    description: `Consent screen instructions`,
    text: `Se está inscribiendo como
        <b id=whoisenrolling>&nbsp;</b>.
        Revise el siguiente acuerdo:
        <span id=consentcounter></span>`
  },
  {
    key: `Thanks for signing up for Project Euphonia!`,
    description: `Instructions screen title`,
    text: `¡Gracias por registrarse en el Proyecto Euphonia!`
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
    <li> Tómese un momento para ver esta introducción de video.</li>
    <li> En la siguiente pantalla, verá <b>tarjetas</b> para leer en voz alta.</li>
    <li> Querrá estar en una <b>configuración silenciosa</b> y evitar cualquier ruido de fondo.</li>
    <li> Presionará el botón de registro azul y luego <b>lea la tarjeta en voz alta</b>, con la mayor precisión posible.</li>
    <li> Cuando haya <b>terminado de hablar</b>, presione el botón azul nuevamente para dejar de grabar.</li>
    <li> Cuando termine de grabar todo ¡Las tarjetas, terminaste!</li>
    <li> ¿Tiene problemas para grabar?
    <a target="_blank" href="http://g.co/disabilitysupport">contáctenos</a>
    para obtener ayuda.</li>`
  },
  {
    key: `Get Started`,
    description: `Instructions screen button to continue to next screen`,
    text: `Empezar`
  },
  {
    key: `Microphone Setup`,
    description: `Microphone and settings screen title`,
    text: `Configuración de micrófono`
  },
  {
    key: `
  In order to record your speech, Euphonia needs permission to use your microphone
  through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`,
    description: `Microphone permission instructions`,
    text: `
        Para registrar su discurso, Euphonia necesita permiso para usar su micrófono
        a través de su navegador web.
        <b>Haga clic en "Permitir"</b>
        para otorgar el uso de su micrófono.`
  },
  {
    key: `
  Euphonia could not access your microphone due to a permission problem. You'll need to allow access
  in order to continue.`,
    description: `Microphone permission error message`,
    text: ` Euphonia no pudo acceder a su micrófono debido a un problema de permiso. Deberá permitir el acceso para continuar.`
  },
  {
    key: `
  It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
  by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`,
    description: `Microphone permission error message`,
    text: `
        Parece que su permiso de micrófono está bloqueado. Deberá
        <b>permitir el acceso</b>
        haciendo clic en la barra de direcciones
        <b>de su navegador</b>,
        y/o
        <b>Restablecer permiso</b>
        para el micrófono.`
  },
  {
    key: `
  Your microphone is all set! You can start recording as soon as you're ready.`,
    description: `Microphone permission success message`,
    text: `¡Tu micrófono está listo! Puedes comenzar a grabar tan pronto como estés listo.`
  },
  {
    key: `Use the default microphone`,
    description: `Let's the user choose the browser's default recording device instead of picking one explicitly`,
    text: `Use el micrófono predeterminado`
  },
  {
    key: `Save`,
    description: `Microphone configuration screen, accept changes to microphone device`,
    text: `Ahorrar`
  },
  {
    key: `Try again`,
    description: `Microphone permission failure retry button`,
    text: `Intentar otra vez`
  },
  {
    key: `Start recording!`,
    description: `Microphone setup screen button, continue to recording screen`,
    text: `¡Empezar a grabar!`
  },
  {
    key: `Microphone settings`,
    description: `Microphone setup screen title`,
    text: `Configuración de micrófono`
  },
  {
    key: `Previous card`,
    description: `Recording screen button, go back to prior card`,
    text: `Tarjeta anterior`
  },
  {
    key: `Next card`,
    description: `Recording screen button, go forward to next card`,
    text: `Siguiente tarjeta`
  },
  {
    key: `Replay`,
    description: `Recording screen button, listen to previously recorded audio`,
    text: `Repetición`
  },
  {
    key: `Stop`,
    description: `Recording screen button, to interrupt a recording that's currently being played back`,
    text: `Detener`
  },
  {
    key: `Delete`,
    description: `Recording screen button, delete a previous recording`,
    text: `Borrar`
  },
  {
    key: `Deleting...`,
    description: `Recording screen button, shown briefly while the recording is being deleted`,
    text: `Eliminar...`
  },
  {
    key: `Record`,
    description: `Recording screen button, record audio for a card`,
    text: `Registro`
  },
  {
    key: `Record Again`,
    description: `Recording screen button, record audio for a card that already has been recorded`,
    text: `Registrar nuevamente`
  },
  {
    key: `(this card is done)`,
    description: `Labels tasks that have already been recorded once`,
    text: `(esta tarjeta está hecha)`
  },
  {
    key: `Cancel`,
    description: `Recording screen button and microphone setting screen button, cancel recording / microphone changes`,
    text: `Cancelar`
  },
  {
    key: `Done`,
    description: `Recording screen button, shown while recording to end the recording and start uploading it`,
    text: `Hecho`
  },
  {
    key: `Canceling...`,
    description: `Recording screen button, shown briefly when the recording is being canceled`,
    text: `Cancelado...`
  },
  {
    key: `Uploading...`,
    description: `Recording screen button, shown briefly when the recording is being uploaded`,
    text: `Subiendo...`
  },
  {
    key: `?`,
    description: `Recording screen button, go to help screen`,
    text: `?`
  },
  {
    key: `Continue`,
    description: `Sign up screen and consent screen buttons, continue to the next page`,
    text: `Continuar`
  },
  {
    key: `No assignments`,
    description: `Recording screen, message when the user has no cards to work on`,
    text: `Sin tareas`
  },
  {
    key: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`,
    description: `Recording screen, progress message of tasks completed so far`,
    text: `<b>{number_of_completed_cards}</b> de <b>{total_number_of_tasks_needed}</b> tarjetas <b>hechas</b>`
  },
  {
    key: `Thank you!`,
    description: `Done screen title, shown when the user has finished at least one pass`,
    text: `¡Gracias!`
  },
  {
    key: `          Great work! You've gone through the cards once, and recorded
  <b class=count>{number_of_completed_cards} cards</b>
  out of the total (<b>{total_number_of_tasks_needed} cards</b>).
  When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards`,
    text: `
        ¡Buen trabajo! Has pasado por las tarjetas una vez, y registrado
        <b class=count>{number_of_completed_cards} tarjetas</b>
        fuera de las tarjetas total
        (<b>{total_number_of_tasks_needed}</b>).
        Cuando esté listo, puede hacer clic en el botón de abajo para finalizar el resto de las tarjetas.`
  },
  {
    key: `          You're almost done! You've gone through the cards once, and recorded
  <b class=count>{number_of_completed_cards} cards</b>
  out of the total (<b>{total_number_of_tasks_needed} cards</b>).
  When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards.
  This version displays when the user has done more than 75% of the work.`,
    text: `
        ¡Ya casi terminas! Has pasado por las tarjetas una vez, y registrado
        <b class=count>{number_of_completed_cards} tarjetas</b>
        fuera de las tarjetas total
        (<b>{total_number_of_tasks_needed}</b>).
        Cuando esté listo, puede hacer clic en el botón de abajo para finalizar el resto de las tarjetas.`
  },
  {
    key: `Continue Recording`,
    description: `Done screen and instructions screen buttons, return to the recording screen`,
    text: `Continuar grabando`
  },
  {
    key: `Continue recording!`,
    description: `Microphone settings screen, return to the recording screen`,
    text: `¡Continúa grabando!`
  },
  {
    key: `You previously indicated that you are eligible.`,
    description: `Signup screen, a message showing that the participant has already completed this form`,
    text: `Anteriormente indicó que es elegible.`
  },
  {
    key: `You have already completed this form.`,
    description: `Interest form screen, a message showing that the participant has already completed this form`,
    text: `Ya ha completado este formulario.`
  },
  {
    key: `Country is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Se requiere país.`
  },
  {
    key: `State is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Se requiere estado.`
  },
  {
    key: `Please tell us if someone will be helping you record.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Por favor, díganos si alguien le ayudará a grabar.`
  },
  {
    key: `Please tell us how to email the person helping you.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Por favor, díganos cómo enviarle un correo electrónico a la persona que lo ayuda.`
  },
  {
    key: `You'll need to give consent to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Deberá dar su consentimiento para continuar.`
  },
  {
    key: `Please write your initials next to your consent.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Por favor escriba sus iniciales junto a su consentimiento.`
  },
  {
    key: `You'll need to accept the terms to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Deberá aceptar los términos para proceder.`
  },
  {
    key: `You have already consented.`,
    description: `Consent screen, a message showing that the participant has already completed this form`,
    text: `Ya has consentido.`
  },
  {
    key: `I agree to the terms above`,
    description: `Consent screen, indicates that the participant consents`,
    text: `Estoy de acuerdo con los términos anteriores`
  },
  {
    key: `&nbsp;(Agreement {which_agreement_number} of {total_number_of_agreements})`,
    description: ``,
    text: `&nbsp;(acuerdo {which_agreement_number} de {total_number_of_agreements})`
  },
  {
    key: `Congratulations! You're all done!`,
    description: `Progress bar display when there are no tasks left to do`,
    text: `¡Felicidades! ¡Ya has terminado!`
  },
  {
    key: `Congratulations!`,
    description: `Title of the done screen`,
    text: `¡Felicidades!`
  },
  {
    key: `Review Recordings (optional)`,
    description: `Button on done screen which returns to the recording screen, if the user wants to listen to recordings`,
    text: `Revisar grabaciones (opcional)`
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
        ¡Has completado todas tus tarjetas! Los revisaremos pronto, y si todo se ve bien,
        recibirá un correo electrónico de
        rewards@perks.com
        en los próximos 7-10 días hábiles con un enlace para reclamar su tarjeta de regalo.
        <br/><br/>
        <b>¡Gracias por contribuir con <b class=count>{number_of_completed_cards} tarjetas</b>
        para proyectar Euphonia!
        </b><br/><br/>
        (si lo desea, Ahora puede regresar y revisar sus grabaciones, pero esto no es necesario.
        <b>¡Ya ha terminado!</b>)`
  },

  {
    key: `__INTEREST_FORM_HTML__`,
    description: `The HTML for the interest form; all HTML IDs must be intact exactly as is!`,

    text: `

    <div class=title
    >Google Project Euphonia: formulario de interés</div>
    <div class=sectiontitle
    >Acerca de ti</div>
    <div class=formbox>
    <div class=fieldname><label for=ifname
    >Nombre</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=fielddescription
    >Apodo, primero y Apellido, solo primer nombre, etc. de cualquier forma que desee ser abordado!</div>
    <input id=ifname class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifcountry
    >¿En qué país reside?</label>
    <span class=required>*</span></div>
    <div class=fielddescription
    >Importante, tenga en cuenta: lamentablemente no podemos enviar tarjetas de regalo en este momento a los residentes de los países indicados a continuación con un asterisco (*). Si reside en uno de estos países, aún puede participar en la investigación del Proyecto Euphonia, y le notificaremos si y cuándo podrá recibir tarjetas de regalo.
    </div>
    <select id=ifcountry class=formselect>
    <option value="Spain">España</option>
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
    >¿En qué estado o territorio reside?</label>
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
    >¿En qué ciudad vives?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifcity class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifaccent
    >¿Cómo caracterizarías tu acento?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifaccent class=formtext />
    </div>
    
    <div class=sectiontitle
    >Información adicional</div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifreferral
    >Cuéntanos cómo escuchaste sobre este proyecto</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifreferral class=formtext />
    </div>
    
    <div class=formbox role=radiogroup id=ifgendergroup style="display: none;">
    <div class=fieldname><label for=ifgendergroup
    >Cuál es su género</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderfemale />
    <label for=ifgenderfemale
    >Femenino</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgendermale />
    <label for=ifgendermale
    >Masculino</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderno />
    <label for=ifgenderno
    >Prefiero no decirlo</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderother />
    <label for=ifgenderother
    >Otro:</label>
    <input type=text class=formtext id=ifgenderothertext />
    </div>
    </div>
    
    <div class=formbox style="display: none;">
    <div class=fieldname><label for=ifrace
    >Cuál es su raza</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifrace class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname
    >¿A cuál de estos tiene acceso?
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicecomputer />
    <label for=ifdevicecomputer
    >Una computadora conectada a Internet equipada con un micrófono y altavoces</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceandroid />
    <label for=ifdeviceandroid
    >Un teléfono o tableta Android (como un Samsung, Pixel, Nexus, etc.)</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceiphone />
    <label for=ifdeviceiphone
    >Un iPhone o iPad</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicenone />
    <label for=ifdevicenone
    >Ninguna de las anteriores</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceother />
    <label for=ifdeviceother
    >Otro:</label>
    <input type=text class=formtext id=ifdeviceothertext aria-label="Name of other device" />
    </div>
    </div>
    
    <div class=formbox id=helperbox>
    <div class=fieldname
    >¿Alguien te ayudará a grabar muestras de habla?
    <span class=required>*</span></div>
    <div class=fielddescription
    >Por ejemplo, un miembro de la familia, terapeuta del habla u otra persona</div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperno selected />
    <label for=ifhelperno
    >No, participaré de forma independiente</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperyes />
    <label for=ifhelperyes
    >Sí, alguien me ayudará y se siente cómodo conmigo compartiendo su información de contacto</label>
    </div>
    </div>
    
    <!-- Helper panel appears if the user chooses "yes" above -->
    <div id=helpersection>
    <div class=sectiontitle
    >Sobre la persona que te ayuda</div>
    <div class=formbox>
    <div class=fielddescription>
    Cuéntanos un poco sobre la persona que te ayuda, para que podamos mantenernos en contacto con los dos. Al incluir el nombre de su asistente, comprende que recibirán información sobre su participación en este proyecto. Puede enumerar más de un asistente y un correo electrónico: simplemente separe cada uno con una coma.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantname
    >Nombre del asistente</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input type=text class=formtext id=ifassistantname />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantemail
    >Dirección de correo electrónico del asistente</label>
    <span class=required>*</span></div>
    <input type=text class=formtext id=ifassistantemail />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantrelationship
    >¿Cuál es la relación de esta persona contigo?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=fielddescription
    >Por ejemplo: cuidador, amigo, familiar, terapeuta del habla, etc.</div>
    <input type=text class=formtext id=ifassistantrelationship />
    </div>
    </div>
    
    <div class=sectiontitle
    >Google Project Euphonia: consentimiento</div>
    
    <div class=forminfobox>
    <div class=fieldname
    >Cuestionario recopilación de información confidencial de identificación personal</div>
    <div class=fielddescription>
    El propósito de este cuestionario es verificar su elegibilidad para un próximo esfuerzo de recopilación de datos con Google, y el propósito de la colección será ayudar a Google a diseñar, investigar, desarrollar, construir y mejorar la accesibilidad de sus productos y servicios actuales y futuros relacionados. a las tecnologías del habla.
    La información que proporciona en este cuestionario se puede combinar con otra información y datos que eligió para proporcionar durante la recopilación de datos, si es seleccionado para participar.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Con su consentimiento, Google recopilará y procesará la información personal que elija proporcionar (a) cuando envíe este cuestionario y (b) si se selecciona para participar en el proyecto, cuando participa en las tareas de recopilación de datos, incluida la información sobre Su uso de tecnología de asistencia, discapacidad o discapacidad del habla y patrones de voz.
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformconsent />
    <label for=ifformconsent>
    Doy mi consentimiento y entraré en mis iniciales aquí:
    </label>
    <input type=text class=formtext id=ifconsentinitials aria-label="Your initials" />
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Revise nuestros Términos y Condiciones y Política de privacidad
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformtos />
    <label for=ifformtos>
    acepto el
    <a target="_blank" href="https://www.google.com/policies/terms/"
    >Términos y condiciones</a>
    y reconocer que mi información se utilizará para la investigación del producto, el desarrollo y la mejora de las tecnologías relacionadas con el habla, y de acuerdo con
    <a target="_blank" href="https://www.google.com/policies/privacy/"
    >Política de privacidad de Google</a>
    .
    </label>
    </div>
    </div>
    
    <div class=forminfobox>
    <div class=fieldname>
    Al enviar este formulario, le da a Google y sus afiliados su consentimiento para contactarlo por correo electrónico.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifotherinfo>
    ¿Tiene alguna otra información que le gustaría compartir con nosotros?
    </label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifotherinfo class=formtext />
    </div>

    `
  },
];
