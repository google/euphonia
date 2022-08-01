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

import {fadeIn, fadeOut} from './util';

// Implements a simple modal dialog box.
export class Dialog {
  overlay: JQuery<HTMLElement>;
  div: JQuery<HTMLElement>;
  formTable?: JQuery<HTMLElement>;

  constructor(opt_cssClass?: string) {
    this.overlay = $('BODY').eadd('<div class=dialogoverlay />');
    this.div = this.overlay.eadd(`<div class=dialog />`);
    this.div.eclass(opt_cssClass, !!opt_cssClass);
    this.overlay.hide();
  }

  // Shows the dialog box
  async start() {
    this.overlay.show();
    await fadeIn(this.overlay);
  }

  // Dismisses the dialog
  async remove() {
    if (this.overlay) {
      await fadeOut(this.overlay);
      this.overlay.hide();
      this.overlay.remove();
    }
  }

  // Builds a tabular form
  startForm() {
    this.formTable = this.div.eadd('<table class=formtable />');
  }

  // Adds a label/value pair to the form table, and returns the input HTML result, or the TD if not specified.
  addFormField(label: string, inputHtml?: string): JQuery<HTMLElement> {
    const tr = this.formTable!.eadd('<tr />');
    tr.eadd('<td class=label />').text(label);
    const td = tr.eadd('<td/>');
    if (inputHtml) {
      return td.eadd(inputHtml);
    } else {
      return td;
    }
  }
}

export class ChoiceDialog extends Dialog {
  // Shows a modal dialog and returns the one of the given choices that the user picked.
  static async choose(prompt: string, ...choices: string[]) {
    return new Promise(async (resolve, reject) => {
      const dialog = new ChoiceDialog(resolve, prompt, choices);
      await dialog.start();
    });
  }

  constructor(resolve: (c: string) => void, prompt: string, choices: string[]) {
    super('choicedialog');
    this.div.eadd('<label />').text(prompt);
    for (let c of choices) {
      const choice = c;
      this.div.eadd('<button />').etext(choice).on('click', e => {
        this.remove();
        resolve(choice);
      });
    }
  }
}
