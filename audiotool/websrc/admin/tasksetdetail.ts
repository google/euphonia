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
import {TaskSetsView} from './tasksets';
import {ETaskSetInfo, ETaskInfo} from '../../commonsrc/schema';
import {Spinner, toast} from '../util';
import {formatTimestamp, parseTags} from '../../commonsrc/util';
import {Dialog, ChoiceDialog} from '../dialog';
import * as schema from '../../commonsrc/schema';

export class TaskSetDetailView {
  data: AdminData;
  parent: TaskSetsView;
  taskset: ETaskSetInfo;
  tasks?: ETaskInfo[];  // set on load
  lastOrder = 0;

  // GUI elements
  div: JQuery<HTMLElement>;
  tsinfo: JQuery<HTMLElement>;
  tasksTable: JQuery<HTMLElement>;
  taskStats: JQuery<HTMLElement>;
  newTaskButton: JQuery<HTMLElement>;
  bulkTasksButton: JQuery<HTMLElement>;
  rulesTable: JQuery<HTMLElement>;
  newRuleButton: JQuery<HTMLElement>;

  constructor(parent: TaskSetsView, taskset: ETaskSetInfo) {
    this.data = parent.app.data;
    this.parent = parent;
    this.taskset = taskset;

    this.div = parent.app.main.eadd('<div id=tasksetdetailview />');
    this.tsinfo = this.div.eadd('<div class=tasksetinfo />');

    // Enrollment rules area
    this.div.eadd('<h2 />').etext('Enrollment Rules');
    this.rulesTable = this.div.eadd('<table class=rules />');
    this.newRuleButton = this.div.eadd('<button class=addrule>Add Rule</button>');
    this.newRuleButton.on('click', async e => await new AddRuleDialog(this).start());

    // Tasks list area
    this.div.eadd('<h2 />').etext('Tasks');
    this.taskStats = this.div.eadd('<div class=taskstats />');
    this.tasksTable = this.div.eadd('<table class=tasks />');
    const buttonbar = this.div.eadd('<div class=buttonbar />');
    this.newTaskButton = buttonbar.eadd('<button>Add Task</button>');
    this.newTaskButton.on('click', async e => await new AddPromptTaskDialog(this).start());
    this.bulkTasksButton = buttonbar.eadd('<button>Bulk Upload Tasks</button>');
    this.bulkTasksButton.on('click', async e => await new BulkTaskDialog(this).start());

    // Fill in the TaskSet Values and rules list
    this.fillTaskSetInfo();
  }

  // Fills in the task set details like name and rules
  private fillTaskSetInfo() {
    this.tsinfo.empty();
    this.tsinfo.eadd('<div class=title />').text(`TaskSet: ${this.taskset.id}`);
    const desc = this.tsinfo.eadd('<div class=description />').etext(`${this.taskset.name}`);
    desc.eadd('<span class=language />').etext(` (${this.taskset.language})`);
    desc.eadd('<a class=editlink />').etext('[edit]').on('click', async e => await this.startEdit());

    this.taskStats.text(`${this.taskset.numAssignedTasks} assignments across ${this.taskset.numAssignedUsers} users`);

    // Fill in the list of enrollment rules
    this.rulesTable.html('<tr><th>Order</th><th>Tags</th><th>Action</th><th class=buttoncol></th></tr>');
    for (const rule of this.taskset.rules) {
      const ruleId = rule.id;
      let action = '';
      if (rule.allTasks) {
        action = 'Assign all';
      } else if (rule.taskIds.length > 0) {
        action = `Assign ${rule.taskIds.length} specific tasks`;
      } else if (rule.sample > 0) {
        action = `Randomly assign up to ${rule.sample} tasks`;
      } else {
        action = 'none';
      }
      const tr = this.rulesTable.eadd('<tr />');
      tr.eadd('<td />').etext(`${rule.order}`);
      tr.eadd('<td />').etext(`${rule.tags.join(' ')}`);
      tr.eadd('<td />').etext(`${action}`);
      const delbtn = tr.eadd('<td />').eadd('<button class=delrulebtn />').etext('Delete');
      delbtn.on('click', async e => await this.deleteRule(ruleId));
    }
    this.parent.app.setNav(`/taskset/${this.taskset.id}`);
  }

  // Displays the view
  async start() {
    this.parent.div.hide();
    this.div.show();
    await this.onTasksChanged();
  }

  // Cleans up this view
  remove() {
    this.div.remove();
    this.parent.div.show();
  }

  // Update the GUI for any changes to the task set
  onDataChanged() {
    this.taskset = this.data.tasksets.get(this.taskset.id)!;
    this.fillTaskSetInfo();
  }

  // Fetch the task list from the server. We don't cache this.
  async onTasksChanged() {
    await Spinner.waitFor(async () => {
      this.tasks = await this.parent.app.data.loadTasksetTasks(this.taskset.id);
      this.tasksTable.html(`<tr><th>Order</th><th>Type</th><th>Prompt</th><th>Created</th><th>Recordings</th></tr>`);
      for (const task of this.tasks) {
        if (this.lastOrder < task.order) {
          this.lastOrder = task.order;
        }
        const tr = this.tasksTable.eadd('<tr />');
        tr.eadd('<td class=num />').text(task.order);
        tr.eadd('<td class=tasktype />').text(task.taskType);
        tr.eadd('<td class=prompt />').text(task.prompt);
        tr.eadd('<td class=created />').text(formatTimestamp(task.creationTimestamp));
        tr.eadd('<td class=num />').etext(`${task.numRecordings}`);
      }
    });
  }

  // Shows the edit taskset dialog
  async startEdit() {
    await new EditTasksetDialog(this).start();
  }

  // Deletes a rule
  async deleteRule(ruleId:number): Promise<void> {
    const confirm = await ChoiceDialog.choose('Delete this rule?', 'Delete', 'Cancel');
    if (confirm !== 'Delete') {
      return;
    }
    await Spinner.waitFor(async () => {
      await this.parent.app.data.deleteTaskSetRule(this.taskset.id, ruleId);
    });
  }

  // Fires the task addition RPC
  async addPromptTask(prompt: string) {
    await Spinner.waitFor(async () => {
      await this.parent.app.data.addPromptTask(this.taskset.id, prompt, this.lastOrder + 1);
    });
  }

  // Bulk uploads a file of prompts
  async bulkUploadTasks(data: ArrayBuffer) {
    await Spinner.waitFor(async () => {
      await this.parent.app.data.bulkUploadTasks(this.taskset.id, data, this.lastOrder + 1);
    });
  }
}

class AddPromptTaskDialog extends Dialog {
  parent: TaskSetDetailView;

  constructor(parent: TaskSetDetailView) {
    super('addtaskdialog');
    this.parent = parent;
    this.div.eadd('<label />').text('Prompt:');
    const promptField = this.div.eadd('<input type=text name=prompt />');
    this.div.eadd('<button>Add Prompt</button>').on('click', async e => {
      const prompt = promptField.val() as string;
      if (!prompt) {
        toast('Missing required fields');
        return;
      }
      await parent.addPromptTask(prompt);
      await this.remove();
    });
    const cancelButton = this.div.eadd('<button>Cancel</button>');
    cancelButton.on('click', async e => await this.remove());
  }
}

class AddRuleDialog extends Dialog {
  parent: TaskSetDetailView;
  orderField: JQuery<HTMLElement>;
  tagsField: JQuery<HTMLElement>;
  allChoice: JQuery<HTMLElement>;
  sampleChoice: JQuery<HTMLElement>;
  sampleSize: JQuery<HTMLElement>;


  constructor(parent: TaskSetDetailView) {
    super('addruledialog');
    this.parent = parent;
    this.div.eadd('<h2 />').etext('Add Enrollment Rule').eadd('<hr />');
    this.startForm();
    this.orderField = this.addFormField('Priority:', '<input type=text name=order />');
    this.tagsField = this.addFormField('Tags:', '<input type=text name=tags />');

    // Radio buttons
    const choices = this.addFormField('Assignment Action:', '<div class=choices />');
    this.allChoice = choices.eadd('<input type=radio class=radio name=action value=all id=allradio />');
    this.allChoice.echecked(true);
    choices.eadd('<label for=allradio />').text('Assign all tasks from this taskset');
    choices.eadd('<br />');
    this.sampleChoice = choices.eadd('<input type=radio class=radio name=action value=sample id=sampleradio />');
    choices.eadd('<label for=sampleradio />').text('Assign a random subset from this taskset');

    // Sample size is only enabled for the sampling choice
    this.sampleSize = this.addFormField('Sample size:', '<input type=text name=samplesize />');
    this.sampleSize.eenable(false);
    this.sampleChoice.on('change', e => this.sampleSize.eenable(this.sampleChoice.is(':checked')));
    this.allChoice.on('change', e => this.sampleSize.eenable(this.sampleChoice.is(':checked')));

    // Action buttons
    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    buttonTd.eadd('<button>Create Rule</button>').on('click', async e => await this.handleAddRule());
    buttonTd.eadd('<button>Cancel</button>').on('click', async e => await this.remove());
  }

  private async handleAddRule() {
    const order = Number(this.orderField.val() as string);
    const tags: string[] = parseTags(this.tagsField.val() as string);
    const action = this.allChoice.is(':checked') ? 'all' : this.sampleChoice.is(':checked') ? 'sample' : '';
    const sample = Number(this.sampleSize.val() as string);
    if (!order || !action || isNaN(order) || (action === 'sample' && isNaN(sample))) {
      toast('Missing required fields');
      return;
    }
    let lastId = 1;
    for (const rule of this.parent.taskset.rules) {
      lastId = Math.max(lastId, rule.id);
      if (rule.order === order) {
        toast('Order already in use');
        return;
      }
    }
    await Spinner.waitFor(async () => {
      await this.parent.parent.app.data.addTaskSetRule(this.parent.taskset.id, lastId + 1, order, tags, action, sample);
      await this.remove();
    });
  }
}

class BulkTaskDialog extends Dialog {
  parent: TaskSetDetailView;

  constructor(parent: TaskSetDetailView) {
    super('bulktaskdialog');
    this.parent = parent;
    this.div.eadd('<label />').text('Text file of prompts:');
    const fileField = this.div.eadd('<input type=file name=promptsfile />');
    const uploadButton = this.div.eadd('<button>Upload</button>');
    uploadButton.on('click', async e => {
      const files: FileList = fileField.prop('files');
      if (!files || files.length !== 1) {
        toast('Please choose a file');
        return;
      }
      await parent.bulkUploadTasks(await files[0].arrayBuffer());
      await this.remove();
    });
    this.div.eadd('<button>Cancel</button>').on('click', async e => await this.remove());
  }
}

class EditTasksetDialog extends Dialog {
  parent: TaskSetDetailView;

  constructor(parent: TaskSetDetailView) {
    super('edittasksetdialog');
    this.parent = parent;
    this.div.eadd('<div class=title />').text(`Edit Taskset: ${parent.taskset.id}`);
    this.startForm();
    const nameField = this.addFormField('Description:', '<input type=text name=name />');
    const languageField = this.addFormField('Language:', '<input type=text name=language />');
    nameField.val(parent.taskset.name);
    languageField.val(parent.taskset.language);

    const buttonTd = this.formTable!.eadd('<tr />').eadd('<td colspan=2 class=buttonbox />');
    buttonTd.eadd('<button>Save</button>').on('click', async e => {
      const name = nameField.val() as string;
      const lang = languageField.val() as string;
      if (!name || !lang) {
        toast('Missing required fields');
        return;
      }
      if (!schema.SUPPORTED_LANGUAGES.has(lang)) {
        toast(`Unsupported language: ${lang}`);
        return;
      }
      await Spinner.waitFor(async () => {
        await parent.data.editTaskSetInfo(parent.taskset.id, name, lang);
        await this.remove();
      });
    });
    buttonTd.eadd('<button>Cancel</button>').on('click', async e => await this.remove());
  }
}
