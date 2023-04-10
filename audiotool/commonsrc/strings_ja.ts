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

export const JA_STRINGS: ELocaleString[] = [
  {
    key: `PAGE_TITLE`,
    en: `Project Euphonia`,
    description: `Web page title for all pages`,
    text: `プロジェクトユーフォニア`
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
    text: `Project Euphonia へようこそ`
  },
  {
    key: `We're exploring how Google products and services
    that use speech as an input method could work better for more people. We're seeking
    voice contributions from adults who have difficulty being understood by others.
    Voice samples can help us improve how Google understands individuals with speech
    impairments.`,
    description: `Signup screen`,
    text: `Google では、音声入力を使用する Google の製品やサービスが、より多くの人々に役立つ方法を模索しています。Google では、聞き取るのが難しい 18 歳以上の方の音声を集めています。音声サンプルは、発話障がいのある方の発話に関する Google の認識機能の改善に役立ちます。`
  },
  {
    key: `<b>IMPORTANT:</b> If you're filling out
    this form on behalf of someone else, please ensure you have their permission
    to do so.`,
    description: `Signup screen`,
    text: `<b>重要:</b> このフォームに代理で記入される場合は、必ずご本人の許可を得るようにしてください。`
  },
  {
    key: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    en: `Questions? <a id=signuphelplink target="_blank">Contact Us</a>`,
    description: `Signup screen`,
    text: `ご不明な点がある場合は、
        <a id=signuphelplink target="_blank"
        >お問い合わせください</a>`
  },
  {
    key: `Already enrolled? &nbsp;`,
    description: `Signup screen`,
    text: `すでに登録されている場合は、&nbsp;`
  },
  {
    key: `Click to sign in and continue recording`,
    description: `Signup screen`,
    text: `クリックしてログインし、録音を続行します`
  },
  {
    key: `To get started, please confirm your eligibility:`,
    description: `Signup screen`,
    text: `はじめに、参加資格をご確認ください。`
  },
  {
    key: `Strangers, or voice technologies like Google Assistant, have difficulty understanding my speech (not because of an accent)`,
    description: `Signup screen eligibility question`,
    text: `発話が、他人や Google アシスタントなどの音声認識技術に理解されにくい（アクセントや訛りは除く）`
  },
  {
    key: `I am at least 18 years of age`,
    description: `Signup screen eligibility question`,
    text: `18 歳以上です`
  },
  {
    key: `Sign in and continue`,
    description: `Signup screen button`,
    text: `ログインして続行する`
  },
  {
    key: `You will need to sign in with your Google
    Account to contribute to the project. If you do not have a Google Account, you can
    create one when you click to continue.`,
    description: `Signup screen instructions`,
    text: `プロジェクトに参加するには、Google アカウントでログインする必要があります。Google アカウントをお持ちでない場合は、クリックして続行すると作成できます。`
  },
  {
    key: `Next`,
    description: `Interest form button, advance to the next screen`,
    text: `次へ`
  },
  {
    key: `Go Back`,
    description: `Interest form button, go back to the signup screen`,
    text: `戻る`
  },
  {
    key: `You must type your name to agree to the terms.`,
    description: `Consent form screen, require consent to proceed`,
    text: `条件に同意するには、お名前の入力が必要です。`
  },
  {
    key: `Reset form and start over`,
    description: `Interest form button, clear fields and start over`,
    text: `フォームをリセットして最初からやり直す`
  },
  {
    key: `You are enrolling as <b id=whoisenrolling>&nbsp;</b>.
    Please review the following agreement: <span id=consentcounter></span>`,
    description: `Consent screen instructions`,
    text: `<b id=whoisenrolling>&nbsp;</b> として登録しています。次の同意事項をご確認ください: <span id=consentcounter></span>`
  },
  {
    key: `Enroll`,
    description: `Consent screen, final action; consents to the program and allows recording`,
    text: `登録`
  },
  {
    key: `Next Agreement`,
    description: `Consent screen, to agree to the current consent and then see the next one. Only shows when there are multiple consents`,
    text: `次の同意事項`
  },
  {
    key: `INSTRUCTIONS_TITLE`,
    en: `Thanks for signing up for Project Euphonia!`,
    description: `Instructions screen title`,
    text: `Project Euphonia にお申し込みいただき、ありがとうございます`
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
      <li>動画の紹介をご覧ください。</li>
      <li>次の画面には、読み上げる<b>カード</b>が表示されます。</li>
      <li><b>静かな環境</b>に身を置いて、背後で雑音がしないようにしてください。</li>
      <li>青色の録音ボタンを押して、できるだけ正確に<b>カードを読み上げて</b>ください。</li>
      <li><b>読み上げが終わったら</b>、もう一度青いボタンを押して録音を止めてください。</li>
      <li>全カードの録音が終われば、完了です</li><li>録音に問題がある場合は
      <a target="_blank" href="http://g.co/disabilitysupport">お問い合わせ</a>ください。
      </li>`
  },
  {
    key: `Get Started`,
    description: `Instructions screen button to continue to next screen`,
    text: `始める`
  },
  {
    key: `Microphone Setup`,
    description: `Microphone and settings screen title`,
    text: `マイクの設定`
  },
  {
    key: `
    In order to record your speech, we need permission to use your microphone
    through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`,
    description: `Microphone permission instructions`,
    text: `発話を録音するために、Euphonia はウェブブラウザからのマイクの使用許可が必要です。<b>「許可」をクリックして</b>マイクの使用を許可してください。`
  },
  {
    key: `
    We could not access your microphone due to a permission problem. You'll need to allow access
    in order to continue.`,
    description: `Microphone permission error message`,
    text: `権限の問題により、マイクにアクセスできませんでした。続行するには、アクセスを許可する必要があります。`
  },
  {
    key: `
    It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
    by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`,
    description: `Microphone permission error message`,
    text: `マイクの権限がブロックされているようです。<b>ブラウザのアドレスバー</b>をクリックして<b>アクセスを許可</b>するか、マイクの<b>権限をリセット</b>する必要があります。`
  },
  {
    key: `
    Your microphone is all set! You can start recording as soon as you're ready.`,
    description: `Microphone permission success message`,
    text: `マイクは設定されています。準備が整えば、すぐに録音を開始できます。`
  },
  {
    key: `Use the default microphone`,
    description: `Let's the user choose the browser's default recording device instead of picking one explicitly`,
    text: `デフォルトのマイクを使用する`
  },
  {
    key: `Save`,
    description: `Microphone configuration screen, accept changes to microphone device`,
    text: `保存`
  },
  {
    key: `Try again`,
    description: `Microphone permission failure retry button`,
    text: `やり直す`
  },
  {
    key: `Start recording!`,
    description: `Microphone setup screen button, continue to recording screen`,
    text: `録音を開始`
  },
  {
    key: `Microphone settings`,
    description: `Microphone setup screen title`,
    text: `マイクの設定`
  },
  {
    key: `Previous card`,
    description: `Recording screen button, go back to prior card`,
    text: `前のカード`
  },
  {
    key: `Next card`,
    description: `Recording screen button, go forward to next card`,
    text: `次のカード`
  },
  {
    key: `Replay`,
    description: `Recording screen button, listen to previously recorded audio`,
    text: `再生`
  },
  {
    key: `Stop`,
    description: `Recording screen button, to interrupt a recording that's currently being played back`,
    text: `停止`
  },
  {
    key: `Delete`,
    description: `Recording screen button, delete a previous recording`,
    text: `削除`
  },
  {
    key: `Deleting...`,
    description: `Recording screen button, shown briefly while the recording is being deleted`,
    text: `削除中...`
  },
  {
    key: `Record`,
    description: `Recording screen button, record audio for a card`,
    text: `録音`
  },
  {
    key: `Record Again`,
    description: `Recording screen button, record audio for a card that already has been recorded`,
    text: `もう一度録音`
  },
  {
    key: `(this card is done)`,
    description: `Labels tasks that have already been recorded once`,
    text: `（このカードは完了しています）`
  },
  {
    key: `Cancel`,
    description: `Recording screen button and microphone setting screen button, cancel recording / microphone changes`,
    text: `キャンセル`
  },
  {
    key: `Done`,
    description: `Recording screen button, shown while recording to end the recording and start uploading it`,
    text: `完了`
  },
  {
    key: `Starting...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `開始しています...`
  },
  {
    key: `Now recording...`,
    description: `Recording screen button, shown briefly just before the microphone starts listening`,
    text: `録音しています...`
  },
  {
    key: `Recording uploaded!`,
    description: `Recording screen message when the recording uploaded successfully`,
    text: `録音をアップロードしました`
  },
  {
    key: `Recording uploaded! Here's the next card.`,
    description: `Recording screen message when the recording uploads successfully and the next card is automatically displayed`,
    text: `録音をアップロードしました。次のカードはこちらです。`
  },
  {
    key: `Recording deleted.`,
    description: `Recording screen message when a recording has just been deleted`,
    text: `録音を削除しました。`
  },
  {
    key: `Recording canceled.`,
    description: `Recording screen message when a recording has just been canceled`,
    text: `録音をキャンセルしました。`
  },
  {
    key: `No recording to delete.`,
    description: `Error message when the user deletes but nothing is selected.`,
    text: `削除する録音がありません。`
  },
  {
    key: `No recording to play.`,
    description: `Error message when the user replays but nothing is selected.`,
    text: `再生する録音がありません。`
  },
  {
    key: `Upload failed, your audio may not be saved.`,
    description: `Error message when the user's recording was not received by the server.`,
    text: `アップロードに失敗しました。音声が保存されていない可能性があります。`
  },
  {
    key: `Canceling...`,
    description: `Recording screen button, shown briefly when the recording is being canceled`,
    text: `キャンセルしています...`
  },
  {
    key: `Uploading...`,
    description: `Recording screen button, shown briefly when the recording is being uploaded`,
    text: `アップロードしています...`
  },
  {
    key: `?`,
    description: `Recording screen button, go to help screen`,
    text: `?`
  },
  {
    key: `Continue`,
    description: `Sign up screen and consent screen buttons, continue to the next page`,
    text: `続行`
  },
  {
    key: `No assignments`,
    description: `Recording screen, message when the user has no cards to work on`,
    text: `割り当てなし`
  },
  {
    key: `<b>{number_of_completed_cards}</b> of <b>{total_number_of_tasks_needed}</b> cards <b>done</b>`,
    description: `Recording screen, progress message of tasks completed so far`,
    text: `<b>{total_number_of_tasks_needed}</b> 個中 <b>{number_of_completed_cards}</b> 個のカードが<b>完了</b>`
  },
  {
    key: `Thank you!`,
    description: `Done screen title, shown when the user has finished at least one pass`,
    text: `ありがとうございました`
  },
  {
    key: `          Great work! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards`,
    text: `おつかれさまでした。カードを一度読み上げ、全体（<b>{total_number_of_tasks_needed} カード</b>）のうち <b class=count>{number_of_completed_cards} カード</b>を録音しました。準備が整ったら、下のボタンをクリックすると残りのカードを作業できます。`
  },
  {
    key: `          You're almost done! You've gone through the cards once, and recorded
    <b class=count>{number_of_completed_cards} cards</b>
    out of the total (<b>{total_number_of_tasks_needed} cards</b>).
    When you're ready, you can click the button below to finish up the rest of the cards.      `,
    description: `Done screen instructions, asks the user to go finish the rest of the cards. This version displays when the user has done more than 75% of the work.`,
    text: `あと少しで完了です。カードを一度読み上げ、全体（<b>{total_number_of_tasks_needed} カード</b>）のうち <b class=count>{number_of_completed_cards} カード</b>を録音しました。準備が整ったら、下のボタンをクリックすると残りのカードを作業できます。`
  },
  {
    key: `Continue Recording`,
    description: `Done screen and instructions screen buttons, return to the recording screen`,
    text: `録音を続行`
  },
  {
    key: `Continue recording!`,
    description: `Microphone settings screen, return to the recording screen`,
    text: `録音を続行します`
  },
  {
    key: `You previously indicated that you are eligible.`,
    description: `Signup screen, a message showing that the participant has already completed this form`,
    text: `あなたは、以前に参加資格があることを示しました。`
  },
  {
    key: `You have already completed this form.`,
    description: `Interest form screen, a message showing that the participant has already completed this form`,
    text: `このフォームはすでに完了しています。`
  },
  {
    key: `Country is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `国を入力してください。`
  },
  {
    key: `State is required.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `地域を入力してください。`
  },
  {
    key: `Please tell us if someone will be helping you record.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `録音をサポートする方がいれば、教えてください。`
  },
  {
    key: `Please tell us how to email the person helping you.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `サポートする方へのメール送信方法を教えてください。`
  },
  {
    key: `You'll need to give consent to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `開始するには同意が必要です。`
  },
  {
    key: `Please write your initials next to your consent.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `同意の横にイニシャルをご記入ください。`
  },
  {
    key: `You'll need to accept the terms to proceed.`,
    description: `Interest form screen, a message showing that a required field needs to be filled in.`,
    text: `開始するには条件に同意する必要があります。`
  },
  {
    key: `You have already consented.`,
    description: `Consent screen, a message showing that the participant has already completed this form`,
    text: `すでに同意しています。`
  },
  {
    key: `By typing my name here, I agree to these terms:`,
    description: `Consent screen, indicates that the participant consents`,
    text: `名前を入力することで、これらの条件に同意します。`
  },
  {
    key: `&nbsp;(Agreement {which_agreement_number} of {total_number_of_agreements})`,
    description: ``,
    text: `&nbsp;({total_number_of_agreements} 件のうち {which_agreement_number} に同意）`
  },
  {
    key: `Congratulations! You're all done!`,
    description: `Progress bar display when there are no tasks left to do`,
    text: `お疲れさまでした。これですべて完了です。`
  },
  {
    key: `Congratulations!`,
    description: `Title of the done screen`,
    text: `お疲れさまでした。`
  },
  {
    key: `Review Recordings (optional)`,
    description: `Button on done screen which returns to the recording screen, if the user wants to listen to recordings`,
    text: `録音の確認（省略可）`
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
    text: `すべてのカードを完了しました。近日中に Google で確認して問題がなければ、7～10 営業日以内に、ギフトカード獲得用のリンクの入ったメールが、rewards@perks.com から届きます。<br/><br/><b>Project Euphonia の <b class=count>{number_of_completed_cards} カード</b>にご協力いただき、ありがとうございます。</b><br/><br/>（ご希望であれば戻って録音を確認できますが、これは必須ではありません。<b>これで完了です</b>）`
  },
  {
    key: `__INTEREST_FORM_HTML__`,
    description: `The HTML for the interest form; all HTML IDs must be intact exactly as is!`,

    // Each translatable string is on a line by itself to make it a little easier to translate
    text: `

    <div class=title
    >Google Project Euphonia: お問い合わせフォーム</div>
    <div class=sectiontitle
    >基本情報</div>
    <div class=formbox>
    <div class=fieldname><label for=ifname
    >名前</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <div class=fielddescription
    >ニックネーム、姓名、名前のみ、など。お好みのものをご利用ください。</div>
    <input id=ifname class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifcountry
    >どちらの国にお住まいですか。</label>
    <span class=required>*</span></div>
    <div class=fielddescription
    >重要、ご注意ください: 現時点では残念ながら、以下にアスタリスク（*）で示している国にお住まいの方にはギフトカードを送信できません。これらの国にお住まいでも、Project Euphonia の調査へのご参加は歓迎いたしますので、ギフトカードを受け取ることができるようになれば、お知らせいたします。
    </div>
    <select id=ifcountry class=formselect>
    <option value="Japan">日本</option>
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
    >どちらの地域にお住まいですか。</label>
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
    >どちらの都市にお住まいですか。</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <input id=ifcity class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifaccent
    >アクセントにどのような特徴がありますか。</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <input id=ifaccent class=formtext />
    </div>
    
    <div class=sectiontitle
    >その他の情報</div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifreferral
    >このプロジェクトを知ったきっかけを教えてください</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <input id=ifreferral class=formtext />
    </div>
    
    <div class=formbox role=radiogroup id=ifgendergroup style="display: none;">
    <div class=fieldname><label for=ifgendergroup
    >性別を教えてください</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderfemale />
    <label for=ifgenderfemale
    >女性</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgendermale />
    <label for=ifgendermale
    >男性</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderno />
    <label for=ifgenderno
    >回答しない</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifgender id=ifgenderother />
    <label for=ifgenderother
    >その他:</label>
    <input type=text class=formtext id=ifgenderothertext />
    </div>
    </div>
    
    <div class=formbox style="display: none;">
    <div class=fieldname><label for=ifrace
    >人種を教えてください</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <input id=ifrace class=formtext />
    </div>
    
    <div class=formbox>
    <div class=fieldname
    >どちらにアクセスできますか
    <span class=optional
    >（省略可）</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicecomputer />
    <label for=ifdevicecomputer
    >マイクとスピーカーを備え、インターネットに接続されたパソコン</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceandroid />
    <label for=ifdeviceandroid
    >Android スマートフォンまたはタブレット（Samsung、Pixel、Nexus など）</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceiphone />
    <label for=ifdeviceiphone
    >iPhone または iPad</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdevicenone />
    <label for=ifdevicenone
    >上記以外</label>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifdeviceother />
    <label for=ifdeviceother
    >その他:</label>
    <input type=text class=formtext id=ifdeviceothertext aria-labelledby="ifdeviceotherlabel" />
    </div>
    </div>
    
    <div class=formbox id=helperbox>
    <div class=fieldname
    >音声サンプルの録音をサポートしてくれる方はいますか
    <span class=required>*</span></div>
    <div class=fielddescription
    >たとえば、ご家族、言語聴覚士など</div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperno selected />
    <label for=ifhelperno
    >いいえ、1 人で参加します</label>
    </div>
    <div class=checkboxrow>
    <input type=radio name=ifhelper id=ifhelperyes />
    <label for=ifhelperyes
    >はい、サポートしてくれる人がおり、連絡先も共有できます</label>
    </div>
    </div>
    
    <!-- Helper panel appears if the user chooses "yes" above -->
    <div id=helpersection>
    <div class=sectiontitle
    >サポートする方について</div>
    <div class=formbox>
    <div class=fielddescription>
    ご本人ともサポートされる方とも連絡がとれるように、サポートされる方について少し教えてください。サポートされる方のお名前を含めることにより、サポートされる方がこのプロジェクトのあなたの参加情報を受け取ることについて了承することになります。サポートされる方のお名前とメールアドレスは複数記入できます。それぞれをカンマで区切ってください。
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantname
    >サポートされる方のお名前</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <input type=text class=formtext id=ifassistantname />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantemail
    >サポートされる方のメールアドレス</label>
    <span class=required>*</span></div>
    <input type=text class=formtext id=ifassistantemail />
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifassistantrelationship
    >どのようなご関係の方ですか。</label>
    <span class=optional
    >（省略可）</span>
    </div>
    <div class=fielddescription
    >たとえば、介護士、ご友人、ご家族、言語聴覚士など</div>
    <input type=text class=formtext id=ifassistantrelationship />
    </div>
    </div>
    
    <div class=sectiontitle
    >Google Project Euphonia: 同意</div>
    
    <div class=forminfobox>
    <div class=fieldname
    >個人を特定できる機密情報のアンケート収集について</div>
    <div class=fielddescription>
    このアンケートの目的は、今後 Google が行うデータ収集作業への参加資格を確認することです。また、データ収集の目的は、現在および今後の音声認識技術に関わる製品やサービスのアクセシビリティを、Google が設計、研究、開発、構築、改善するのを支援することです。
    参加者に選ばれた場合、あなたがこのアンケートに提供する情報は、データ収集に際して提供することを決めた他の情報やデータと組み合わされる場合があります。
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Google は、あなたの同意にもとづき、（a）本アンケートを提出いただく際、（b）プロジェクトへの参加者に選ばれデータ収集タスクに参加いただく際に、支援技術の利用、発話時の障がいや不都合、発話パターンに関する情報を含む、あなたが提供を決めた個人情報の収集と処理を行います。
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformconsent />
    <label for=ifformconsent>
    同意し、ここにイニシャルを入力します。
    </label>
    <input type=text class=formtext id=ifconsentinitials aria-labelledby="ifformconsentlabel" />
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname>
    Google の利用規約とプライバシー ポリシーをご確認ください
    <span class=required>*</span>
    </div>
    <div class=checkboxrow>
    <input type=checkbox id=ifformtos />
    <label for=ifformtos>
    利用規約に
    <a target="_blank" href="https://www.google.com/policies/terms/"
    >同意し、</a>
    製品の研究・開発、および音声関連技術の改善のために、Google のプライバシー ポリシーに従って、
    <a target="_blank" href="https://www.google.com/policies/privacy/"
    >私の情報が使用されることを認めます</a>
    。
    </label>
    </div>
    </div>
    
    <div class=forminfobox>
    <div class=fieldname>
    このフォームを送信することにより、Google とその関連会社がメールでお客様と連絡を取ることに同意したものとします。
    </div>
    </div>
    
    <div class=formbox>
    <div class=fieldname><label for=ifotherinfo>
    他に共有したい情報はありますか。
    </label>
    <span class=optional
    >（省略可）</span>
    </div>
    <input id=ifotherinfo class=formtext />
    </div>
`
  },
];
