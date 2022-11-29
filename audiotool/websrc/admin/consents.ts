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

import {AdminView} from './admin';
import {Dialog} from '../dialog';
import {formatTimestamp, normalizeTag, parseTags} from '../../commonsrc/util';
import {Spinner, toast} from '../util';
import {ConsentDetailView} from './consentdetail';

// Shows the list of all consents.
export class ConsentsView {
  app: AdminView;
  div: JQuery<HTMLElement>;
  table: JQuery<HTMLElement>;
  newButton: JQuery<HTMLElement>;
  refreshButton: JQuery<HTMLElement>;

  consentdetail?: ConsentDetailView;

  constructor(app: AdminView) {
    this.app = app;
    this.div = app.main.eadd('<div id=consentsview />');
    this.div.eadd('<div class=title />').text('Consents');
    const buttonBox = this.div.eadd('<div class=buttonbox />');
    this.newButton = buttonBox.eadd('<button>New Consent</button>');
    this.newButton.on('click', async e => await this.startNewConsent());
    this.refreshButton = buttonBox.eadd('<button>Refresh</button>');
    this.refreshButton.on('click', async e => await this.app.data.update());
    const scrollbox = this.div.eadd('<div class=scrolltable />');
    this.table = scrollbox.eadd('<table class=consents />');
    this.div.hide();
  }

  getNav() {
    if (this.consentdetail) {
      return `/consent/${this.consentdetail.consent.id}`;
    } else {
      return '/consents';
    }
  }

  // Displays the view
  start() {
    if (this.consentdetail) {
      this.consentdetail.remove();
      this.consentdetail = undefined;
    }
    this.app.setNav('/consents');
    this.div.show();
    this.onDataChanged();
  }

  // Cleans up this view
  remove() {
    this.div.remove();
    if (this.consentdetail) {
      this.consentdetail.remove();
      this.consentdetail = undefined;
    }
  }

  // Refills the table with the current list of consents
  onDataChanged() {
    this.table.html(`<thead><tr><th>ID</th><th>Description</th><th>Language</th>
    <th class=date>Created</th><th>Users</th></tr></thead>`);
    const tbody = this.table.eadd('<tbody />');
    for (const [, consent] of this.app.data.consents) {
      const tr = tbody.eadd('<tr />');
      tr.eadd('<td class=consentid />').eadd(`<a href="#/consent/${consent.id}" />`).etext(consent.id);
      tr.eadd('<td class=name />').text(consent.name);
      tr.eadd('<td class=language />').text(consent.language);
      tr.eadd('<td class=date />').text(formatTimestamp(consent.creationTimestamp));
      tr.eadd('<td class=num />').text(consent.versions.reduce((n, v) => n + v.numUsers, 0));
    }

    if (this.consentdetail) {
      this.consentdetail.onDataChanged();
    }
  }

  async startNewConsent() {
    await new AddConsentDialog(this).start();
  }

  async startConsentDetail(cid: string) {
    const consent = this.app.data.consents.get(cid);
    if (!consent) {
      toast(`Unknown Consent: ${cid}`);
      return;
    }
    this.consentdetail = new ConsentDetailView(this, consent);
    await this.consentdetail.start();
  }
}

// Creates a consent
class AddConsentDialog extends Dialog {
  parent: ConsentsView;

  constructor(parent: ConsentsView) {
    super('consentdialog');
    this.parent = parent;
    this.div.eadd('<div class=title />').text('Add New Consent');
    this.startForm();
    const idField = this.addFormField('ID:', '<input type=text name=consentid />');
    const nameField = this.addFormField('Description:', '<input type=text name=name />');
    const languageField = this.addFormField('Language:', '<input type=text name=language value="en-US" />');
    const tagsField = this.addFormField('Tags:', '<input type=text name=tags />');
    const optionalField = this.addFormField('Optional:', '<input type=checkbox name=optional class=checkbox />');

    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    const addButton = buttonTd.eadd('<button>Create Consent</button>');
    addButton.on('click', async e => {
      const idtext = idField.val() as string;
      const name = nameField.val() as string;
      const lang = languageField.val() as string;
      const tags: string[] = parseTags(tagsField.val() as string);
      const optional = optionalField.is(':checked');
      if (!idtext || !name || !lang) {
        toast('Missing required fields');
        return;
      }
      const id = normalizeTag(idtext);
      if (parent.app.data.consents.get(id)) {
        toast(`Consent with ID already exists: ${id}`);
        return;
      }
      await Spinner.waitFor(async () => {
        await parent.app.data.addConsent(id, name, lang, tags, optional);
        await this.remove();
      });
    });
    const cancelButton = buttonTd.eadd('<button>Cancel</button>');
    cancelButton.on('click', async e => await this.remove());
  }
}
