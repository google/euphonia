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
import {TaskSetDetailView} from './tasksetdetail';
import {formatTimestamp, normalizeTag, findAndRemove} from '../../commonsrc/util';
import {Dialog} from '../dialog';
import {Spinner, Dropdown, toast} from '../util';
import * as schema from '../../commonsrc/schema';

// Shows the list of all task sets.
export class TaskSetsView {
  app: AdminView;
  div: JQuery<HTMLElement>;
  table: JQuery<HTMLElement>;
  newButton: JQuery<HTMLElement>;
  refreshButton: JQuery<HTMLElement>;

  tsdetail?: TaskSetDetailView;

  constructor(app: AdminView) {
    this.app = app;
    this.div = app.main.eadd('<div id=tasksetsview />');
    this.div.eadd('<div class=title />').text('TaskSets');
    const buttonBox = this.div.eadd('<div class=buttonbox />');
    this.newButton = buttonBox.eadd('<button>New TaskSet</button>');
    this.newButton.on('click', async e => await this.startNewTaskSet());
    this.refreshButton = buttonBox.eadd('<button>Refresh</button>');
    this.refreshButton.on('click', async e => await this.app.data.update());
    const scrollbox = this.div.eadd('<div class=scrolltable />');
    this.table = scrollbox.eadd('<table class=tasksets />');
    this.div.hide();
  }

  getNav() {
    if (this.tsdetail) {
      return `/taskset/${this.tsdetail.taskset.id}`;
    } else {
      return '/tasksets';
    }
  }

  // Displays the view
  start() {
    if (this.tsdetail) {
      this.tsdetail.remove();
      this.tsdetail = undefined;
    }
    this.app.setNav('/tasksets');
    this.div.show();
    this.onDataChanged();
  }

  // Cleans up this view
  remove() {
    this.div.remove();
    if (this.tsdetail) {
      this.tsdetail.remove();
      this.tsdetail = undefined;
    }
  }

  // Refills the table with the current list of task sets
  onDataChanged() {
    this.table.html(`<thead><tr><th>ID</th><th>Description</th><th>Language</th>
    <th class=date>Created</th><th>Assigned Users</th><th>Assigned Tasks</th></tr></thead>`);
    const tbody = this.table.eadd('<tbody />');
    for (let [, ts] of this.app.data.tasksets) {
      const tr = tbody.eadd('<tr />');
      tr.eadd('<td class=tsid />').eadd(`<a href="#/taskset/${ts.id}" />`).etext(ts.id);
      tr.eadd('<td class=name />').text(ts.name);
      tr.eadd('<td class=language />').text(ts.language);
      tr.eadd('<td class=date />').text(formatTimestamp(ts.creationTimestamp));
      tr.eadd('<td class=num />').text(ts.numAssignedUsers);
      tr.eadd('<td class=num />').text(ts.numAssignedTasks);
    }

    if (this.tsdetail) {
      this.tsdetail.onDataChanged();
    }
  }

  // Updates task list details
  async onTasksChanged() {
    if (this.tsdetail) {
      await this.tsdetail.onTasksChanged();
    }
  }

  async startNewTaskSet() {
    await new AddTaskSetDialog(this).start();
  }

  async startTaskSetDetail(tsid: string) {
    const ts = this.app.data.tasksets.get(tsid);
    if (!ts) {
      toast(`Unknown TaskSet: ${tsid}`);
      return;
    }
    this.tsdetail = new TaskSetDetailView(this, ts);
    await this.tsdetail.start();
  }
}

// Creates a task set
class AddTaskSetDialog extends Dialog {
  parent: TaskSetsView;

  constructor(parent: TaskSetsView) {
    super('addtasksetdialog');
    this.parent = parent;
    this.div.eadd('<div class=title />').text('Add New Taskset');
    this.startForm();
    const idField = this.addFormField('ID:', '<input type=text name=tsid />');
    const nameField = this.addFormField('Description:', '<input type=text name=name />');
    const languageField = this.addFormField('Language:', '<input type=text name=language value="en-US" />');

    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    const addButton = buttonTd.eadd('<button>Create Taskset</button>');
    addButton.on('click', async e => {
      const idtext = idField.val() as string;
      const name = nameField.val() as string;
      const lang = languageField.val() as string;
      if (!idtext || !name || !lang) {
        toast('Missing required fields');
        return;
      }
      const id = normalizeTag(idtext);
      if (parent.app.data.tasksets.get(id)) {
        toast(`TaskSet with ID already exists: ${id}`);
        return;
      }
      await Spinner.waitFor(async () => {
        // TODO: error handling
        await parent.app.data.addTaskSet(id, name, lang);
        await this.remove();
      });
    });
    const cancelButton = buttonTd.eadd('<button>Cancel</button>');
    cancelButton.on('click', async e => await this.remove());
  }
}

// Bulk-assigns users to a selected task set
export class BulkAssignDialog extends Dialog {
  app: AdminView;
  euids: string[];
  tsChoice: Dropdown;
  allChoice: JQuery<HTMLElement>;
  sampleChoice: JQuery<HTMLElement>;
  sampleSize: JQuery<HTMLElement>;
  tasksChoice: JQuery<HTMLElement>;
  tasksTable: JQuery<HTMLElement>;
  taskTicks: Map<JQuery<HTMLElement>, schema.ETaskInfo> = new Map();
  assignLine: JQuery<HTMLElement>;

  constructor(app: AdminView, euids: string[]) {
    super('bulkassigndialog');
    this.app = app;
    this.euids = euids;

    this.div.eadd('<div class=title />').text('Assign Tasks');

    // Dropdown chooser for the task set
    this.startForm();
    this.tsChoice = new Dropdown(this.addFormField('Taskset:'), 'tschoice');
    for (let [tsid, ts] of this.app.data.tasksets) {
      this.tsChoice.addOption(tsid, `${ts.id}: ${ts.name}`);
    }
    this.tsChoice.onchange(async e => await this.loadTaskSet_(this.tsChoice.getSelected()!));

    // Three choices for how we assign tasks: all, sample, or specific
    const choicetd1 = this.addFormField('Assign:');
    this.allChoice = choicetd1.eadd('<input type=radio class=radio name=tasks value=all id=allradio />');
    choicetd1.eadd('<label for=allradio />').text('All tasks from this taskset');
    
    const choicetd2 = this.addFormField('');
    this.sampleChoice = choicetd2.eadd('<input type=radio class=radio name=tasks value=sample id=sampleradio />');
    choicetd2.eadd('<label for=sampleradio />').text('Random sample of: ');

    const choicetd3 = this.addFormField('');
    this.tasksChoice = choicetd3.eadd('<input type=radio class=radio name=tasks value=tasks id=tasksradio />');
    choicetd3.eadd('<label for=tasksradio />').text('Specific tasks:');

    // Sample size is only enabled for the sampling choice
    this.sampleSize = choicetd2.eadd('<input type=text name=samplesize />');
    this.sampleSize.eenable(false);
    this.sampleChoice.on('change', e => this.updateGUI_());
    this.allChoice.on('change', e => this.updateGUI_());
    this.tasksChoice.on('change', e => this.updateGUI_());
    this.sampleSize.on('change', e => this.updateGUI_());

    // The list of tasks for the selected taskset will appear here
    const choicetd4 = this.addFormField('');
    choicetd4.addClass('taskstablebox');
    this.tasksTable = choicetd4.eadd('<table class="taskstable disabled" />');

    // Action buttons
    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    this.assignLine = buttonTd.eadd('<span class=assignline />');
    buttonTd.eadd('<button>Assign</button>').on('click', async e => await this.handleAssign_());
    buttonTd.eadd('<button>Cancel</button>').on('click', async e => await this.remove());
  }

  // Loads the taskset's tasks
  async start() {
    await super.start();
    await this.loadTaskSet_(this.tsChoice.getSelected()!);
  }

  // Updates the disabled state of the choices when the radio buttons change
  updateGUI_() {
    this.sampleSize.eenable(this.sampleChoice.is(':checked'));
    this.tasksTable.eclass('disabled', !this.tasksChoice.is(':checked'));
    this.assignLine.text(`Assigning ${this.countTasks_()} tasks to ${this.euids.length} user(s)...`);
  }

  // Returns the number of tasks we're assigning: all or selected or sampled
  countTasks_(): number {
    if (this.tasksChoice.is(':checked')) {
      return this.getTickedTaskIds_().length;

    } else if (this.sampleChoice.is(':checked')) {
      const count = parseInt(`${this.sampleSize.val()}`);
      return isNaN(count) ? 0 : count;

    } else if (this.allChoice.is(':checked')) {
      return this.taskTicks.size;
    
    } else {
      return 0;  // nothing selected?
    }
  }

  // Returns a list of task IDs of the selected tasks.
  getTickedTaskIds_(): string[] {
    const result: string[] = [];
    for (let [tick, task] of this.taskTicks) {
      if (tick.is(':checked')) {
        result.push(task.id);
      }
    }
    return result;
  }

  // Called when the user picks a different task set, so we can load its prompts
  async loadTaskSet_(tsid: string) {
    this.allChoice.prop('checked', true);
    await Spinner.waitFor(async () => {
      this.taskTicks.clear();
      const tasks = await this.app.data.loadTasksetTasks(tsid);
      this.tasksTable.html(`
          <tr><th class=tick><input type=checkbox id=tickalltasks />
          </th><th>Prompt</th><th>Created</th></tr>`);
      for (let task of tasks) {
        const tr = this.tasksTable.eadd('<tr />');
        const tick = tr.eadd('<td class=tick />').eadd('<input type=checkbox class=tick />');
        tr.eadd('<td class=prompt />').text(task.prompt);
        tr.eadd('<td class=created />').text(formatTimestamp(task.creationTimestamp));
        this.taskTicks.set(tick, task);
        tick.on('change', e => this.updateGUI_());
      }
      $('#tickalltasks').on('change', e => this.toggleTickAll());

      if (tasks.length == 0) {
        this.tasksTable.html(`<tr><td>No tasks in this taskset, nothing to assign</td></tr>`);
      }
      this.updateGUI_();
    });
  }

  // Auto-selects all or no tasks when the tick-all-tasks box is changed
  toggleTickAll() {
    const checked = $('#tickalltasks').is(':checked');
    for (let [tick, ] of this.taskTicks) {
      tick.prop('checked', checked);
    }
    this.updateGUI_();
  }

  // Commits the user's assignment choice
  async handleAssign_() {
    const tsid = this.tsChoice.getSelected();
    if (!tsid || this.countTasks_() < 1 || this.euids.length < 1) {
      toast('Invalid selection');
      return;
    }

    const spec: schema.EAssignmentRule = {
      allTasks: this.allChoice.is(':checked'),
      taskIds: this.tasksChoice.is(':checked') ? this.getTickedTaskIds_() : [],
      sample: this.sampleChoice.is(':checked') ? this.countTasks_() : 0,
      id: 0,
      order: 0,
      tags: [],
    };
  
    await Spinner.waitFor(async () => {
      const successes = await this.app.data.assignTasks(this.euids, tsid, spec);
      if (successes.length != this.euids.length) {
        toast('Assignment had some failures, you can retry the remaining users', 7000);
        for (let euid of successes) {
          findAndRemove(this.euids, euid);
        }
      } else {
        // Success
        this.remove();
      }
    });
  }
}
