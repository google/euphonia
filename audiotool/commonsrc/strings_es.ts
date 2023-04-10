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
    key: `PAGE_TITLE`,
    en: `Project Euphonia`,
    description: `Web page title for all pages`,
    text: `Proyecto Euphonia`
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
    text: `¡Te damos la bienvenida a Project Euphonia!`
  },
  {
    key: `We're exploring how Google products and services
    that use speech as an input method could work better for more people. We're seeking
    voice contributions from adults who have difficulty being understood by others.

    Voice samples can help us improve how Google understands individuals with speech
    impairments.`,
    description: `Signup screen`,
    text: `Estamos investigando cómo podrían funcionar mejor y llegar a más personas los productos y servicios de Google que utilizan la voz como método de introducción de texto. Necesitamos la aportación de personas adultas cuya voz resulte difícil de entender. Las muestras de voz pueden ayudarnos a hacer que Google entienda mejor a las personas que tengan algún trastorno del habla.`
  },
  {
    key: `<b>IMPORTANT:</b> If you're filling out
    this form on behalf of someone else, please ensure you have their permission
    to do so.`,
    description: `Signup screen`,
    text: `<b>IMPORTANTE:</b> Si quieres rellenar este formulario en nombre de otra persona, asegúrate de tener su permiso para hacerlo.`
  },
  {
    key: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    en: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    description: `Signup screen`,
    text: `¿Tienes alguna pregunta? 
        <a id=signuphelplink target="_blank"
        >Contacta con nosotros</a>`
  },
  {
    key: `Already enrolled? &nbsp;`,
    description: `Signup screen`,
    text: `¿Ya te has registrado? &nbsp;`
  },
  {
    key: `Click to sign in and continue recording`,
    description: `Signup screen`,
    text: `Haz clic para iniciar sesión y seguir grabando`
  },
  {
    key: `To get started, please confirm your eligibility:`,
    description: `Signup screen`,
    text: `Para empezar, confirma que cumples los requisitos:`
  },
  {
    key: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`,
    description: `Signup screen eligibility question`,
    text: `A las personas que no me conocen o a las tecnologías de voz, como el Asistente de Google, les resulta difícil entenderme cuando hablo (no por mi acento)`
  },
  {
    key: `I am at least 18 years of age`,
    description: `Signup screen eligibility question`,
    text: `Tengo 18 años o más`
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
    text: `Tendrás que iniciar sesión con tu cuenta de Google para poder colaborar en el proyecto. Si no tienes una cuenta de Google, puedes crear una cuando hagas clic para continuar.`
  },
  {
    key: `Next`,
    description: `Interest form button, advance to the next screen`,
    text: `Siguiente`
  },
  {
    key: `Go Back`,
    description: `Interest form button, go back to the signup screen`,
    text: `Volver`
  },
  {
    key: `You must type your name to agree to the terms.`,
    description: `Consent form screen, require consent to proceed`,
    text: `Debes escribir tu nombre para aceptar los términos.`
  },
  {
    key: `Reset form and start over`,
    description: `Interest form button, clear fields and start over`,
    text: `Borrar formulario y volver a empezar`
  },
  {
    key: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
    Please review the following agreement: <span id=consentcounter></span>`,
    description: `Consent screen instructions`,
    text: `Te estás registrando como <b id=whoisenrolling>&nbsp;</b>. Lee el siguiente contrato: <span id=consentcounter></span>`
  },
  {
    key: `Enroll`,
    description: `Consent screen, final action; consents to the program and allows recording`,
    text: `Registrarse`
  },
  {
    key: `Next Agreement`,
    description: `Consent screen, to agree to the current consent and then see the next one. Only shows when there are multiple consents`,
    text: `Siguiente contrato`
  },
  {
    key: `INSTRUCTIONS_TITLE`,
    en: `Thanks for signing up for Project Euphonia!`,
    description: `Instructions screen title`,
    text: `¡Gracias por registrarte en Project Euphonia!`
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
    <li>Dedica unos minutos a ver este vídeo introductorio.</li>
    <li>En la pantalla siguiente, verás unas <b>tarjetas</b> que tendrás que leer en alto.</li>
    <li>Te recomendamos que estés en un <b>entorno tranquilo</b> en el que no haya ruidos de fondo.</li>
    <li>Tendrás que pulsar el botón azul para grabar y, a continuación, <b>leer la tarjeta en voz alta</b> con la mayor precisión posible.</li> <li>Cuando hayas <b>terminado de hablar</b>, pulsa de nuevo el botón azul para dejar de grabar.</li>
    <li>Una vez grabadas todas las tarjetas, habrás terminado.</li>
    <li>¿Tienes problemas para grabar?
    <a target="_blank" href="http://g.co/disabilitysupport">Ponte en contacto con nosotros</a> para que te ayudemos.</li>`
  },
  {
    key: `Get Started`,
    description: `Instructions screen button to continue to next screen`,
    text: `Empezar`
  },
  {
    key: `Microphone Setup`,
    description: `Microphone and settings screen title`,
    text: `Configuración del micrófono`
  },
  {
    key: `
    In order to record your speech, we need permission to use your microphone
    through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`,
    description: `Microphone permission instructions`,
    text: `Para poder grabar lo que dices, Euphonia necesita permiso para usar el micrófono a través de tu navegador web. <b>Haz clic en "Permitir"</b> para concedérselo.`
  },
  {
    key: `
    We could not access your microphone due to a permission problem. You'll need to allow access
    in order to continue.`,
    description: `Microphone permission error message`,
    text: `Euphonia no ha podido acceder a tu micrófono porque hay un problema con el permiso. Para continuar, tienes que permitir el acceso.`
  },
  {
    key: `
    It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
    by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`,
    description: `Microphone permission error message`,
    text: `Parece que el permiso de acceso a tu micrófono está bloqueado. Tienes que <b>permitir el acceso</b> haciendo clic en la <b>barra de direcciones de tu navegador</b>, o <b>restablecer el permiso</b> del micrófono.`
  },
  {
    key: `
    Your microphone is all set! You can start recording as soon as you're ready.`,
    description: `Microphone permission success message`,
    text: `¡El micrófono ya está listo! Puedes empezar a grabar cuando quieras.`
  },
  {
    key: `Use the default microphone`,
    description: `Let's the user choose the browser's default recording device instead of picking one explicitly`,
    text: `Usar el micrófono predeterminado`
  },
  {
    key: `Save`,
    description: `Microphone configuration screen, accept changes to microphone device`,
    text: `Guardar`
  },
  {
    key: `Try again`,
    description: `Microphone permission failure retry button`,
    text: `Reintentar`
  },
  {
    key: `Start recording!`,
    description: `Microphone setup screen button, continue to recording screen`,
    text: `¡Empieza a grabar!`
  },
  {
    key: `Microphone settings`,
    description: `Microphone setup screen title`,
    text: `Ajustes del micrófono`
  },
  {
    key: `Previous card`,
    description: `Recording screen button, go back to prior card`,
    text: `Tarjeta anterior`
  },
  {
    key: `Next card`,
    description: `Recording screen button, go forward to next card`,
    text: `Tarjeta siguiente`
  },
  {
    key: `Replay`,
    description: `Recording screen button, listen to previously recorded audio`,
    text: `Volver a reproducir`
  },
  {
    key: `Stop`,
    description: `Recording screen button, to interrupt a recording that's currently being played back`,
    text: `Detener`
  },
  {
    key: `Delete`,
    description: `Recording screen button, delete a previous recording`,
    text: `Eliminar`
  },
  {
    key: `Deleting...`,
    description: `Recording screen button, shown briefly while the recording is being deleted`,
    text: `Eliminando...`
  },
  {
    key: `Record`,
    description: `Recording screen button, record audio for a card`,
    text: `Grabar`
  },
  {
    key: `Record Again`,
    description: `Recording screen button, record audio for a card that already has been recorded`,
    text: `Volver a grabar`
  },
  {
    key: `(this card is done)`,
    description: `Labels tasks that have already been recorded once`,
    text: `(ya has hecho esta tarjeta)`
  },
  {
    key: `Cancel`,
    description: `Recording screen button and microphone setting screen button, cancel recording / microphone changes`,
    text: `Cancelar`
  },
  {
    key: `Done`,
    description: `Recording screen button, shown while recording to end the recording and start uploading it`,
    text: `Listo`
  },
  {
    key: `Starting...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `Iniciando...`
  },
  {
    key: `Now recording...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `Grabando ahora...`
  },
  {
    key: `Recording uploaded!`,
    description: `Recording screen message when the recording uploaded successfully`,
    text: `Grabación subida.`
  },
  {
    key: `Recording uploaded! Here's the next card.`,
    description: `Recording screen message when the recording uploads successfully and the next card is automatically displayed`,
    text: `Grabación subida. Aquí tienes la siguiente tarjeta.`
  },
  {
    key: `Recording deleted.`,
    description: `Recording screen message when a recording has just been deleted`,
    text: `Grabación eliminada.`
  },
  {
    key: `Recording canceled.`,
    description: `Recording screen message when a recording has just been canceled`,
    text: `Grabación cancelada.`
  },
  {
    key: `No recording to delete.`,
    description: `Error message when the user deletes but nothing is selected.`,
    text: `No hay ninguna grabación que eliminar.`
  },
  {
    key: `No recording to play.`,
    description: `Error message when the user replays but nothing is selected.`,
    text: `No hay ninguna grabación que reproducir.`
  },
  {
    key: `Upload failed, your audio may not be saved.`,
    description: `Error message when the user's recording was not received by the server.`,
    text: `No se ha podido subir la grabación. Puede que el audio no se guarde.`
  },
  {
    key: `Canceling...`,
    description: `Recording screen button, shown briefly when the recording is being canceled`,
    text: `Cancelando...`
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
    text: `No hay ninguna tarea`
  },
  {
    key: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`,
    description: `Recording screen, progress message of tasks completed so far`,
    text: `<b>{number_of_completed_cards}</b> de <b>{total_number_of_tasks_needed}</b> tarjetas <b>terminadas</b>`
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
    text: `¡Buen trabajo! Has visto las tarjetas una vez y has grabado <b class=count>{number_of_completed_cards} tarjetas</b> del total de <b>{total_number_of_tasks_needed}</b>. Cuando quieras, haz clic en el botón de abajo para terminar el resto de las tarjetas.`
  },
  {
    key: `          You're almost done! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards.
  This version displays when the user has done more than 75% of the work.`,
    text: `¡Ya casi has terminado! Has visto las tarjetas una vez y has grabado <b class=count>{number_of_completed_cards} tarjetas</b> del total de <b>{total_number_of_tasks_needed}</b>. Cuando quieras, haz clic en el botón de abajo para terminar el resto de las tarjetas.`
  },
  {
    key: `Continue Recording`,
    description: `Done screen and instructions screen buttons, return to the recording screen`,
    text: `Seguir grabando`
  },
  {
    key: `Continue recording!`,
    description: `Microphone settings screen, return to the recording screen`,
    text: `¡Sigue grabando!`
  },
  {
    key: `You previously indicated that you are eligible.`,
    description: `Signup screen, a message showing that the participant has already completed this form`,
    text: `Has indicado anteriormente que cumples los requisitos.`
  },
  {
    key: `You have already completed this form.`,
    description: `Interest form screen, a message showing that the participant has already completed this form`,
    text: `Ya has completado este formulario.`
  },
  {
    key: `Country is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Es obligatorio indicar el país.`
  },
  {
    key: `State is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Es obligatorio indicar el estado/provincia.`
  },
  {
    key: `Please tell us if someone will be helping you record.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Indícanos si alguien te va a ayudar a grabar.`
  },
  {
    key: `Please tell us how to email the person helping you.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Indícanos cómo podemos contactar por correo electrónico con la persona que te va a ayudar.`
  },
  {
    key: `You'll need to give consent to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Tendrás que dar tu consentimiento para continuar.`
  },
  {
    key: `Please write your initials next to your consent.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Escribe tus iniciales junto a tu consentimiento.`
  },
  {
    key: `You'll need to accept the terms to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `Tendrás que aceptar los términos para continuar.`
  },
  {
    key: `You have already consented.`,
    description: `Consent screen, a message showing that the participant has already completed this form`,
    text: `Ya has dado tu consentimiento.`
  },
  {
    key: `By typing my name here, I agree to these terms:`,
    description: `Consent screen, indicates that the participant consents`,
    text: `Al escribir mi nombre aquí, acepto los siguientes términos:`
  },
  {
    key: `&nbsp;(Agreement {which_agreement_number} of {total_number_of_agreements})`,
    description: ``,
    text: `&nbsp;(Contrato {which_agreement_number} de {total_number_of_agreements})`
  },
  {
    key: `Congratulations! You're all done!`,
    description: `Progress bar display when there are no tasks left to do`,
    text: `¡Enhorabuena! ¡Ya has terminado!`
  },
  {
    key: `Congratulations!`,
    description: `Title of the done screen`,
    text: `¡Enhorabuena!`
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
  <b>Thank you for contributing <b class=count>{number_of_completed_cards} cards</b> to the project!</b>
    <br/><br/>
    (If you wish, you can now go back and review your recordings, but this is not necessary. <b>You're done!</b>)`,
    description: `Descriptive text on the done screen`,
    text: `Has completado todas las tarjetas. Las revisaremos próximamente y, si está todo bien, recibirás un correo de rewards@perks.com en los próximos 7-10 días hábiles con un enlace a tu tarjeta regalo. <br/><br/> <b>Gracias por contribuir con <b class=count>{number_of_completed_cards} tarjetas</b> al Proyect Euphonia.</b> <br/><br/> Si quieres, puedes volver y revisar tus grabaciones, pero no es necesario. <b>Ya has acabado</b>.`
  },

  {
    key: `__INTEREST_FORM_HTML__`,
    description: `The HTML for the interest form; all HTML IDs must be intact exactly as is!`,

    text: `

    <div class=title
    >Proyecto Google Euphonia: formulario de interés</div>
    <div class=sectiontitle
    >Información sobre ti</div>
    <div class=formbox>
    <div class=fieldname><label for=ifname
    >Nombre</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=fielddescription
    >Tu apodo, tu nombre y apellidos, solo tu nombre, etc. La forma en que prefieras que nos dirijamos a ti.</div>
    <input id=ifname class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifcountry
    >¿En qué país resides?</label>
    <span class=required>*</span></div>
    <div class=fielddescription
    >TEN EN CUENTA LA SIGUIENTE INFORMACIÓN IMPORTANTE: Lamentablemente, en este momento no podemos enviar tarjetas regalo a residentes de los países marcados a continuación con un asterisco (*). Si resides en uno de estos países, puedes participar en la investigación de Proyect Euphonia, y te avisaremos cuando puedas recibir tarjetas regalo.
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
    >¿En qué país o territorio resides?</label>
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
    >¿Cómo describirías tu acento?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifaccent class=formtext />
    </div>
    
    <div class=sectiontitle
    >Información adicional</div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifreferral
    >Cuéntanos cómo conociste este proyecto</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifreferral class=formtext />
    </div>
    
    <div class=formbox role=radiogroup id=ifgendergroup style="display: none;">
    <div class=fieldname><label for=ifgendergroup
    >¿Cuál es tu sexo?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderfemale />
    <label for=ifgenderfemale
    >Mujer</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgendermale />
    <label for=ifgendermale
    >Hombre</label>
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
    >¿A qué raza perteneces?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifrace class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname
    >¿A cuál de estos dispositivos tienes acceso?
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicecomputer />
    <label for=ifdevicecomputer
    >Un ordenador con conexión a Internet, micrófono y altavoces</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceandroid />
    <label for=ifdeviceandroid
    >Un teléfono o tablet Android (por ejemplo, Samsung, Pixel, Nexus, etc.)</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceiphone />
    <label for=ifdeviceiphone
    >Un iPhone o un iPad</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicenone />
    <label for=ifdevicenone
    >Ninguno de los anteriores</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceother />
    <label for=ifdeviceother
    >Otro:</label>
    <input type=text class=formtext id=ifdeviceothertext aria-labelledby="ifdeviceotherlabel" />
    </div>
    </div>
    
    <div class=formbox id=helperbox>
    <div class=fieldname
    >¿Te va a ayudar alguien a grabar las muestras de voz?
    <span class=required>*</span></div>
    <div class=fielddescription
    >Por ejemplo, un familiar, un logopeda u otra persona</div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperno selected />
    <label for=ifhelperno
    >No, voy a participar de forma independiente</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperyes />
    <label for=ifhelperyes
    >Sí, me va a ayudar alguien, y esa persona está de acuerdo con que comparta su información</label>
    </div>
    </div>
    
    <!-- Helper panel appears if the user chooses "yes" above -->
    <div id=helpersection>
    <div class=sectiontitle
    >Información sobre la persona que te va a ayudar</div>
    <div class=formbox>
    <div class=fielddescription>
    Nos gustaría que nos proporcionases un poco de información sobre la persona que te va a ayudar para que podamos estar en contacto con ambos más fácilmente. Al incluir el nombre de tu asistente, aceptas que reciba información sobre tu participación en este proyecto. Puedes incluir más de un asistente y un correo electrónico. Basta con separarlos con una coma.
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
    >¿Qué relación tienes con esta persona?</label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <div class=fielddescription
    >Por ejemplo, cuidador, amigo, familiar, logopeda, etc.</div>
    <input type=text class=formtext id=ifassistantrelationship />
    </div>
    </div>
    
    <div class=sectiontitle
    >Proyecto Google Euphonia: consentimiento</div>
    
    <div class=forminfobox>
    <div class=fieldname
    >Cuestionario para recoger información personal identificable sensible</div>
    <div class=fielddescription>
    El objetivo de este cuestionario es verificar que cumples los requisitos para participar en una iniciativa de recogida de datos que realizará Google próximamente. La finalidad de la recogida será ayudar a Google a diseñar, investigar, desarrollar y mejorar la accesibilidad de sus productos y servicios (actuales y futuros) relacionados con tecnologías de voz.
    La información que proporciones en este cuestionario se puede combinar con otra información y otros datos que decidas proporcionar durante la recogida de datos si se te selecciona para participar.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Con tu consentimiento, Google recogerá y tratará la información personal que decidas proporcionar a) cuando envíes este cuestionario y b) si se te selecciona para participar en el proyecto, cuando colabores en las tareas de recogida de datos, incluida la información sobre el uso que haces de tecnología asistencial, tu discapacidad o trastorno del habla y tus patrones de voz.
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformconsent />
    <label for=ifformconsent>
    Doy mi consentimiento e incluyo mis iniciales aquí:
    </label>
    <input type=text class=formtext id=ifconsentinitials aria-labelledby="ifformconsentlabel" />
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Revisa nuestros Términos y Condiciones, y nuestra Política de Privacidad
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformtos />
    <label for=ifformtos>
    Acepto los
    <a target="_blank" href="https://www.google.com/policies/terms/"
    >Términos y Condiciones</a>
    y soy consciente de que mi información se va a utilizar para investigar, desarrollar y mejorar productos relacionados con tecnologías del habla de acuerdo con
    <a target="_blank" href="https://www.google.com/policies/privacy/"
    >la Política de Privacidad de Google</a>
    .
    </label>
    </div>
    </div>
    
    <div class=forminfobox>
    <div class=fieldname>
    Al enviar este formulario, das tu consentimiento a Google y a sus entidades asociadas para que se pongan en contacto contigo por correo electrónico.
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifotherinfo>
    ¿Hay alguna otra información que quieras compartir con nosotros?
    </label>
    <span class=optional
    >(Opcional)</span>
    </div>
    <input id=ifotherinfo class=formtext />
    </div>

    `
  },
];
