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
import {formatTimestamp, lastitem} from '../../commonsrc/util';
import {UserFilter, UserPredicate} from '../../commonsrc/userfilter';
import {toast} from '../util';
import * as schema from '../../commonsrc/schema';

// Shows the list of all users.
export class UsersView {
  app: AdminView;
  div: JQuery<HTMLElement>;
  table: JQuery<HTMLElement>;
  ticks: Map<string, JQuery<HTMLElement>>;
  sortSpec = new Set(['Last Recorded']);  // list of labels to sort by, from least to most significant
  filterFn: UserPredicate = user => true;  // predicate that returns false if the given user should be filtered away

  userdetail?: UserDetailView;

  // Each function sorts a pair of users by a particular property. Date sorts are descending by default.
  static SORT_COMPARATORS = {
    'EUID': (a: schema.EUserInfo, b: schema.EUserInfo) => a.euid.localeCompare(b.euid),
    'Name': (a: schema.EUserInfo, b: schema.EUserInfo) => a.name.localeCompare(b.name),
    'Email': (a: schema.EUserInfo, b: schema.EUserInfo) => a.email.localeCompare(b.email),
    'Language': (a: schema.EUserInfo, b: schema.EUserInfo) => a.language.localeCompare(b.language),
    'Tags': (a: schema.EUserInfo, b: schema.EUserInfo) => JSON.stringify(a.tags).localeCompare(JSON.stringify(b.tags)),
    'Last Recorded': (a: schema.EUserInfo, b: schema.EUserInfo) => b.lastRecordingTimestamp - a.lastRecordingTimestamp,
    'Num Recordings': (a: schema.EUserInfo, b: schema.EUserInfo) => a.numRecordings - b.numRecordings,
    'Total Tasks': (a: schema.EUserInfo, b: schema.EUserInfo) => a.numTasks - b.numTasks,
    'Tasks Completed': (a: schema.EUserInfo, b: schema.EUserInfo) => a.numCompletedTasks - b.numCompletedTasks,
    'Tasks Remaining': (a: schema.EUserInfo, b: schema.EUserInfo) => (a.numTasks - a.numCompletedTasks) - (b.numTasks - b.numCompletedTasks),
    'Created': (a: schema.EUserInfo, b: schema.EUserInfo) => b.createTimestamp - a.createTimestamp,
    'Signed up': (a: schema.EUserInfo, b: schema.EUserInfo) => b.signupTimestamp - a.signupTimestamp,
  };

  constructor(app: AdminView) {
    this.app = app;
    this.div = app.main.eadd('<div id=userview />');
    this.div.eadd('<div class=title />').text('Users');
    this.ticks = new Map();
    const buttonBox = this.div.eadd('<div class=buttonbox />');
    buttonBox.eadd('<button>New User</button>').on('click', async e => await this.startNewUser());
    buttonBox.eadd('<button>Assign Tasks</button>').on('click', async e => await this.startBulkAssign());
    buttonBox.eadd('<button>Refresh</button>').on('click', async e => await this.app.data.update());
    const filterbox = this.div.eadd('<div class=filterbox />');
    filterbox.eadd('<label />').etext('Filter: ');
    const filterbar = filterbox.eadd('<input type=text class=filterbar />');
    const scrollbox = this.div.eadd('<div class=scrolltable />');
    this.table = scrollbox.eadd('<table class=users />');
    this.div.hide();

    filterbar.on('input', e => this.setFilter(filterbar.val() as string));
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
    this.drawTable();

    if (this.userdetail) {
      this.userdetail.onDataChanged();
    }
  }

  // Refills the table with the current list of users
  private drawTable() {
    const currentSort = lastitem(this.sortSpec);

    // Clear the table and install a sortable header
    this.table.empty();
    const headerRow = this.table.eadd('<thead />').eadd('<tr />');
    headerRow.eadd(`<th class=tick><input type=checkbox id=tickallusers /></th>`);
    $('#tickallusers').on('change', e => this.toggleTickAll());
    const addHeader = (label: string, css?: string) => {
      const th = headerRow.eadd(`<th />`);
      if (css) {
        th.addClass(css);
      }
      th.text(label);
      th.on('click', e => this.setSort(label));
      th.eclass('sorted', currentSort == label || currentSort == `-${label}`);
    };
    addHeader('EUID');
    addHeader('Name');
    addHeader('Email');
    addHeader('Language');
    addHeader('Tags');
    addHeader('Last Recorded', 'date');
    addHeader('Num Recordings', 'num');
    addHeader('Total Tasks', 'num');
    addHeader('Tasks Completed', 'num');
    addHeader('Tasks Remaining', 'num');
    addHeader('Created', 'date');
    addHeader('Signed up', 'date');

    // Add the table of data, sorted
    const tbody = this.table.eadd('<tbody />');
    this.ticks.clear();
    for (const user of this.toSorted(this.app.data.users)) {
      if (!this.filterFn(user)) {
        continue;
      }
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
  }

  // Filters the user list with the given text.
  private setFilter(filterSpec: string) {
    if (!filterSpec || filterSpec.trim() == '') {
      this.filterFn = x => true;

    } else {
      // Parse the user's query string into a predicate
      this.filterFn = UserFilter.parse(filterSpec);
    }
    this.drawTable();
  }

  // Changes the sort order of the users table; if the current sort is already this one, it is reversed.
  private setSort(sortByHeader: string) {
    const reverseOf = `-${sortByHeader}`;
    const lastSort = lastitem(this.sortSpec);

    this.sortSpec.delete(sortByHeader);
    this.sortSpec.delete(reverseOf);

    // Reverse the direction this time if we are re-sorting
    if (lastSort == sortByHeader) {
      this.sortSpec.add(reverseOf);
    } else {
      this.sortSpec.add(sortByHeader);
    }

    this.drawTable();
  }

  // Returns a sorted version of the given array of users.
  private toSorted(users: Map<string, schema.EUserInfo>): schema.EUserInfo[] {
    const result = [...users.values()];

    // Resort the list from least to most significant ordering, expecting a stable sort.
    for (let label of this.sortSpec) {
      result.sort(UsersView.getComparator(label));
    }
    return result;
  }

  // Returns the comparator for the given label, optionally reversed
  private static getComparator(label) {
    if (label.startsWith('-')) {
      const comparator = UsersView.SORT_COMPARATORS[label.substring(1)];
      return (a: schema.EUserInfo, b: schema.EUserInfo) => comparator(b, a);
    } else {
      return UsersView.SORT_COMPARATORS[label];
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
