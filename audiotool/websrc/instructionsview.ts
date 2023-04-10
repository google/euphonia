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
    this.div.eadd('<div class=title />').eitext(`INSTRUCTIONS_TITLE`);
    this.div.eadd('<div class=helptext />').eihtml(`INSTRUCTIONS_HTML`);
    this.doneButton = this.div.eadd('<button />').eitext('Get Started');
    this.doneButton.on('click', async e => await this.app.navigateTo('/setup', true));

    this.video = this.div.eadd('<div class=video />');
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);

    if (show) {
      this.video.eihtml(`INSTRUCTIONS_VIDEO_HTML`);
    } else {
      this.video.empty();
    }

    const hasRecordings = this.data.user && this.data.user.numRecordings > 0;
    this.doneButton.eitext(hasRecordings ? 'Continue recording' : 'Get Started');
  }

  // Handles data update
  async handleUpdate() {
  }
}
