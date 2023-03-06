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

// Shows instructions to users once they're enrolled but before they've recorded.
export class InstructionsView {
  app: App;
  data: Data;
  div: JQuery<HTMLElement>;
  video: JQuery<HTMLElement>;
  doneButton: JQuery<HTMLElement>;

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=instructionview />');
    this.div.hide();

    // Instructions view, shown after signup but before recording
    this.div.eadd('<div class=title />').text(`Thanks for signing up for Project Euphonia!`);
    this.div.eadd('<div class=helptext />').ehtml(`
    <ul>
    <li>Please take a moment to watch this video introduction.</li>
    <li>On the next screen, you'll see <b>cards</b> to read aloud.</li>
    <li>You'll want to be in a <b>quiet setting</b> and avoid any background noise.</li>
    <li>You'll press the blue Record button, and then <b>read the
    card aloud</b>, as accurately as possible.</li>
    <li>When you are <b>finished speaking</b>, press the blue button again to stop recording.</li>
    <li>When you finish recording all the cards, you're done!</li>
    <li>Having trouble recording? <a target="_blank" href="http://g.co/disabilitysupport">Contact us</a> for help.</li>
    `);
    this.doneButton = this.div.eadd('<button>Get Started</button>');
    this.doneButton.on('click', async e => await this.app.navigateTo('/setup?passive=true'));

    this.video = this.div.eadd('<div class=video />');
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);

    if (show) {
      this.video.html(`
          <iframe width="560" height="315" src="https://www.youtube.com/embed/sMLED9xrLts"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          `);
    } else {
      this.video.empty();
    }

    const hasRecordings = this.data.user && this.data.user.numRecordings > 0;
    this.doneButton.etext(hasRecordings ? 'Continue recording' : 'Get Started');
  }

  // Handles data update
  async handleUpdate() {
  }
}
