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

// Summary view when the user finishes the last card, or all cards.
export class DoneView {
  app: App;
  data: Data;
  div: JQuery<HTMLElement>;
  title: JQuery<HTMLElement>;
  statusText: JQuery<HTMLElement>;
  okButton: JQuery<HTMLElement>;

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=doneview />');
    this.div.hide();

    this.title = this.div.eadd('<div class=title />');
    this.statusText = this.div.eadd('<div class=statustext />');
    this.okButton = this.div.eadd('<button />');
    this.okButton.on('click', async e => await this.app.navigateTo('/record'));
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);
    this.updateGUI();
  }

  // Sets the text based on the user's progress.
  private updateGUI() {
    // Final card view, depending on whether they still have work to do
    const user = this.data.user;
    if (!user) {
      return;
    }

    if (user.numCompletedTasks >= user.numTasks) {
      this.title.eitext('Congratulations!');
      this.statusText.eihtml(`
          You have completed all your cards! We'll be reviewing them soon, and if everything
          looks good, you'll be receiving an email from rewards@perks.com within the next 7-10
          business days with a link to claim your gift card.
          <br/><br/>
          <b>Thank you for contributing <b class=count>{number_of_completed_cards} cards</b> to Project Euphonia!</b>
          <br/><br/>
          (If you wish, you can now go back and review your recordings, but this is not necessary. <b>You're done!</b>)
      `, 'number_of_completed_cards', `${user.numCompletedTasks}`);
      this.okButton.eitext('Review Recordings (optional)');
      this.okButton.addClass('review');

    } else {
      this.title.eitext('Thank you!');
      const msg = user.numCompletedTasks >= user.numTasks * 0.75 ? `You're almost done!` : `Great work!`;
      this.statusText.eihtml(`
          ${msg} You've gone through the cards once, and recorded
          <b class=count>{number_of_completed_cards} cards</b>
          out of the total (<b>{total_number_of_tasks_needed} cards</b>).
          When you're ready, you can click the button below to finish up the rest of the cards.
      `, 'number_of_completed_cards', `${user.numCompletedTasks}`, 'total_number_of_tasks_needed', `${user.numTasks}`);
      this.okButton.eitext('Continue Recording');
    }
  }

  // Handles data update
  async handleUpdate() {
    this.updateGUI();
  }
}
