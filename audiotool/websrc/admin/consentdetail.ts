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

import {AdminData} from './admindata';
import {ConsentsView} from './consents';
import {EConsentInfo} from '../../commonsrc/schema';
import {Spinner, toast, toURL} from '../util';
import {formatTimestamp, parseTimestamp, parseTags, sorted} from '../../commonsrc/util';
import {Dialog, ChoiceDialog} from '../dialog';
import * as schema from '../../commonsrc/schema';

export class ConsentDetailView {
  data: AdminData;
  parent: ConsentsView;
  consent: EConsentInfo;

  // GUI elements
  div: JQuery<HTMLElement>;
  infoDiv: JQuery<HTMLElement>;
  versionsTable: JQuery<HTMLElement>;
  newVersionButton: JQuery<HTMLElement>;

  constructor(parent: ConsentsView, consent: EConsentInfo) {
    this.data = parent.app.data;
    this.parent = parent;
    this.consent = consent;

    this.div = parent.app.main.eadd('<div id=consentdetailview />');
    this.infoDiv = this.div.eadd('<div class=consentinfo />');

    // Versions area
    this.div.eadd('<h2 />').etext('Versions');
    this.versionsTable = this.div.eadd('<table class=versions />');
    this.newVersionButton = this.div.eadd('<button class=addversion>Add Version</button>');
    this.newVersionButton.on('click', async e => await new AddVersionDialog(this).start());
    this.fillInfo();
  }

  // Fills in all data from the consent info struct
  private fillInfo() {
    this.infoDiv.empty();
    this.infoDiv.eadd('<h2 />').etext(`Consent: ${this.consent.id}`);
    const table = this.infoDiv.eadd('<table />');
    table.eaddtr([$('<span class=label />').etext('Description:'), $('<span />').etext(`${this.consent.name}`)]);
    table.eaddtr([$('<span class=label />').etext('Language:'), $('<span />').etext(`${this.consent.language}`)]);
    table.eaddtr([$('<span class=label />').etext('Tags:'), $('<span />').etext(`${this.consent.tags.join(' ')}`)]);
    table.eaddtr([$('<span class=label />').etext('Created:'), $('<span />').etext(`${formatTimestamp(this.consent.creationTimestamp)}`)]);
    table.eaddtr([$('<span class=label />').etext('Optional:'), $('<span />').etext(`${this.consent.optional ? 'yes' : 'no'}`)]);
    table.eaddtr([$('<span class=label />').etext('Active:'), $('<span />').etext(`${this.consent.active ? 'yes' : 'no'}`)]);
    this.infoDiv.eadd('<button class=edit />').etext('Edit').on('click', async e => await this.startEdit());

    // Fill in the list of versions
    this.versionsTable.html(`<tr><th>Version</th><th>Status</th><th>Effective</th>
        <th>Description</th><th>Users</th><th>Created</th><th class=buttoncol></th></tr>`);
    for (const version of this.getVersions()) {
      const versionNumber = version.version;
      const tr = this.versionsTable.eadd('<tr />');
      tr.eadd(`<td class=order />`).etext(`${version.version}`);
      tr.eadd(`<td class=status />`).etext(this.getVersionStatusText(version));
      tr.eadd(`<td class=date />`).etext(`${formatTimestamp(version.liveTimestamp)}`);
      tr.eadd(`<td class=description />`).etext(version.description);
      tr.eadd(`<td class=num />`).etext(`${version.numUsers}`);
      tr.eadd(`<td class=date />`).etext(`${formatTimestamp(version.creationTimestamp)}`);
      const buttonTd = tr.eadd('<td />');
      const textURL = toURL('/api/getconsenttext', {consentId: this.consent.id, version: versionNumber});
      buttonTd.eadd('<a target=_blank />').etext('Contents').prop('href', textURL);
      if (version.numUsers === 0) {
        const delbtn = buttonTd.eadd('<button class=delversionbtn />').etext('Delete');
        delbtn.on('click', async e => await this.deleteVersion(versionNumber));
      }
    }
    this.parent.app.setNav(`/consent/${this.consent.id}`);
  }

  getVersions() {
    return sorted(this.consent.versions, (a, b) => b.version - a.version);
  }

  // Returns a human-readable message describing this version's disposition; live, upcoming, or superseded.
  private getVersionStatusText(version: schema.EConsentVersion): string {
    if (!this.consent.active) {
      return 'inactive';  // All versions are inactive when the consent is inactive
    }
    const now = Date.now();
    for (const v of this.consent.versions) {
      if (v.liveTimestamp <= now && v.version > version.version) {
        return 'superseded';  // There's a newer version that's already live
      }
    }
    return version.liveTimestamp <= now ? 'active' : 'upcoming';
  }

  // Displays the view
  async start() {
    this.parent.div.hide();
    this.div.show();
  }

  // Cleans up this view
  remove() {
    this.div.remove();
    this.parent.div.show();
  }

  // Update the GUI for any changes to the consent
  onDataChanged() {
    this.consent = this.data.consents.get(this.consent.id)!;
    this.fillInfo();
  }

  // Shows the edit consent dialog
  async startEdit() {
    await new EditConsentDialog(this).start();
  }

  async deleteVersion(versionNumber: number): Promise<void> {
    const confirm = await ChoiceDialog.choose('Delete this version?', 'Delete', 'Cancel');
    if (confirm !== 'Delete') {
      return;
    }
    await this.data.deleteConsentVersion(this.consent.id, versionNumber);
  }

  async addVersion(description: string, liveTimestamp: number, html: ArrayBuffer): Promise<void> {
    await this.data.addConsentVersion(this.consent.id, description, liveTimestamp, html);
  }
}

class EditConsentDialog extends Dialog {
  parent: ConsentDetailView;

  constructor(parent: ConsentDetailView) {
    super('editconsentdialog');
    this.parent = parent;
    this.div.eadd('<div class=title />').text(`Edit Consent: ${parent.consent.id}`);
    this.startForm();
    const nameField = this.addFormField('Description:', '<input type=text name=name />');
    const languageField = this.addFormField('Language:', '<input type=text name=language />');
    const tagsField = this.addFormField('Tags:', '<input type=text name=tags />');
    const optionalField = this.addFormField('Optional:', '<input type=checkbox class=checkbox name=optional />');
    const activeField = this.addFormField('Active:', '<input type=checkbox class=checkbox name=active />');
    nameField.val(parent.consent.name);
    languageField.val(parent.consent.language);
    tagsField.val(parent.consent.tags.join(' '));
    optionalField.echecked(parent.consent.optional);
    activeField.echecked(parent.consent.active);

    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    buttonTd.eadd('<button>Save</button>').on('click', async e => {
      const name = nameField.val() as string;
      const lang = languageField.val() as string;
      const tags: string[] = parseTags(tagsField.val() as string);
      const isOptional = optionalField.is(':checked');
      const isActive = activeField.is(':checked');
      if (!name || !lang) {
        toast('Missing required fields');
        return;
      }
      if (!schema.SUPPORTED_LANGUAGES.has(lang)) {
        toast(`Unsupported language: ${lang}`);
        return;
      }
      await Spinner.waitFor(async () => {
        await parent.data.editConsentInfo(parent.consent.id, name, lang, tags, isActive, isOptional);
        await this.remove();
      });
    });
    buttonTd.eadd('<button>Cancel</button>').on('click', async e => await this.remove());
  }
}

class AddVersionDialog extends Dialog {
  parent: ConsentDetailView;

  constructor(parent: ConsentDetailView) {
    super('addconsentversiondialog');
    this.parent = parent;

    this.div.eadd('<div class=title />').text('Add Version');
    this.startForm();
    const descriptionField = this.addFormField('Description:', '<input type=text name=description />');
    const liveField = this.addFormField('Live date:', '<input type=text name=live />').evalue(`${new Date()}`);
    const fileField = this.addFormField('HTML:', '<input type=file name=consentfile />');

    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    buttonTd.eadd('<button>Upload Version</button>').on('click', async e => {
      const files: FileList = fileField.prop('files');
      if (!files || files.length !== 1) {
        toast('Please choose a file');
        return;
      }
      const description = descriptionField.val() as string;
      const live = parseTimestamp(liveField.val() as string);
      if (!description || !live) {
        toast('Missing required fields');
        return;
      }
      await parent.addVersion(description, live, await files[0].arrayBuffer());
      await this.remove();
    });
    const cancelButton = buttonTd.eadd('<button>Cancel</button>');
    cancelButton.on('click', async e => await this.remove());
  }
}
