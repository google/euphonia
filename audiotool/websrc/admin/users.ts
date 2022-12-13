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
import {UserDetailView, UserPropertiesDialog, UserValues} from './userdetail';
import {BulkAssignDialog} from './tasksets';
import {formatTimestamp} from '../../commonsrc/util';
import {toast} from '../util';

// Shows the list of all users.
export class UsersView {
  app: AdminView;
  div: JQuery<HTMLElement>;
  table: JQuery<HTMLElement>;
  ticks: Map<string, JQuery<HTMLElement>>;

  userdetail?: UserDetailView;

  constructor(app: AdminView) {
    this.app = app;
    this.div = app.main.eadd('<div id=userview />');
    this.div.eadd('<div class=title />').text('Users');
    this.ticks = new Map();
    const buttonBox = this.div.eadd('<div class=buttonbox />');
    buttonBox.eadd('<button>New User</button>').on('click', async e => await this.startNewUser());
    buttonBox.eadd('<button>Assign Tasks</button>').on('click', async e => await this.startBulkAssign());
    buttonBox.eadd('<button>Refresh</button>').on('click', async e => await this.app.data.update());
    // TODO: filterbar
    const scrollbox = this.div.eadd('<div class=scrolltable />');
    this.table = scrollbox.eadd('<table class=users />');
    this.div.hide();
  }

  getNav() {
    if (this.userdetail) {
      return `/user/${this.userdetail.user.euid}`;
    } else {
      return '/users';
    }
  }

  // Displays the view
  start() {
    if (this.userdetail) {
      this.userdetail.remove();
      this.userdetail = undefined;
    }
    this.app.setNav('/users');
    this.div.show();
    this.onDataChanged();
  }

  // Cleans up this view
  remove() {
    this.div.remove();
    if (this.userdetail) {
      this.userdetail.remove();
      this.userdetail = undefined;
    }
  }

  // Refills the table with the current list of users
  onDataChanged() {
    this.table.html(`<thead><tr>
                     <th class=tick><input type=checkbox id=tickallusers /></th>
                     <th>EUID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Language</th>
                     <th>Tags</th>
                     <th class=date>Last Recorded</th>
                     <th class=num>Num Recordings</th>
                     <th class=num>Total Tasks</th>
                     <th class=num>Tasks Completed</th>
                     <th class=num>Tasks Remaining</th>
                     <th class=date>Created</th>
                     <th class=date>Signed up</th></tr></thead>`);
    const tbody = this.table.eadd('<tbody />');
    this.ticks.clear();
    for (const [, user] of this.app.data.users) {
      const euid = user.euid;
      const tr = tbody.eadd('<tr />');
      this.ticks.set(euid, tr.eadd('<td class=tick />').eadd('<input type=checkbox />'));
      tr.eadd('<td class=euid />').eadd(`<a href="#/user/${euid}" />`).etext(euid);
      tr.eadd('<td class=name />').text(user.name);
      tr.eadd('<td class=email />').text(user.email);
      tr.eadd('<td class=language />').text(user.language);
      tr.eadd('<td class=tags />').text(user.tags.join(' '));
      tr.eadd('<td class=date />').text(formatTimestamp(user.lastRecordingTimestamp));
      tr.eadd('<td class=num />').text(user.numRecordings);
      tr.eadd('<td class=num />').text(user.numTasks);
      tr.eadd('<td class=num />').text(user.numCompletedTasks);
      tr.eadd('<td class=num />').text(user.numTasks - user.numCompletedTasks);
      tr.eadd('<td class=date />').text(formatTimestamp(user.createTimestamp));
      tr.eadd('<td class=date />').text(formatTimestamp(user.signupTimestamp, 'Never'));
    }

    $('#tickallusers').on('change', e => this.toggleTickAll());

    if (this.userdetail) {
      this.userdetail.onDataChanged();
    }
  }

  // Updates assignment and completion details for one user, if visible
  async onUserTasksChanged() {
    if (this.userdetail) {
      await this.userdetail.onUserTasksChanged();
    }
  }

  // Auto-selects all or no users when the tick-all-users box is changed
  toggleTickAll() {
    const checked = $('#tickallusers').is(':checked');
    for (const [, input] of this.ticks) {
      input.echecked(checked);
    }
  }

  // Shows the add user dialog
  async startNewUser() {
    const defaults = new UserValues();
    defaults.language = 'en-US';
    await new AddUserDialog(this, defaults).start();
  }

  // Shows the bulk assign dialog
  async startBulkAssign() {
    const euids: string[] = [];
    for (const [euid, input] of this.ticks) {
      if (input.is(':checked')) {
        euids.push(euid);
      }
    }
    if (euids.length === 0) {
      toast('No users selected');
      return;
    }
    await new BulkAssignDialog(this.app, euids).start();
  }

  async startUserDetail(euid: string) {
    const user = this.app.data.users.get(euid);
    if (!user) {
      toast(`No such user: ${euid}`);
      return;
    }
    this.userdetail = new UserDetailView(this, user);
    await this.userdetail.start();
  }
}

// Creates a new user
class AddUserDialog extends UserPropertiesDialog {
  parent: UsersView;

  constructor(parent: UsersView, defaults: UserValues) {
    super(defaults, 'Add User', 'Add User');
    this.parent = parent;
  }

  async commit(name: string, email: string, lang: string, tags: string[], notes: string): Promise<void> {
    await this.parent.app.data.addUser(name, email, lang, tags, notes);
  }
}
