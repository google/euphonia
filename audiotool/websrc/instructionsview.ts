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
  doneButton: JQuery<HTMLElement>;
  

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=instructionview />');
    this.div.hide();

    // Instructions view, shown after signup but before recording
    this.div.eadd('<div class=title />').text(`Thanks for signing up for Project Euphonia!`);
    this.div.eadd('<div class=helptext />').text(`Here's a short video to help you get started:`);
    this.div.eadd('<div class=video />').html(`
    <iframe width="560" height="315" src="https://www.youtube.com/embed/e6z5rEgoqnI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
    this.doneButton = this.div.eadd('<button>Start recording!</button>');
    this.doneButton.on('click', async e => await this.app.navigateTo('/record'));
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.div.eshow(show);
  }

  // Handles data update
  async handleUpdate() {
  }
}
