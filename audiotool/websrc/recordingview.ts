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
import {sleep, sleepFrame, fork, authenticatedFetch, Spinner, isSafari} from './util';
import {ProgressWidget} from './progresswidget';
import * as schema from '../commonsrc/schema';
import {WavBuilder, toBase64} from '../commonsrc/util';

// Suggest that the user wait before speaking
const MIN_START_DELAY_MS = isSafari() ? 750 : 250;
const MIN_STOP_DELAY_MS = isSafari() ? 750 : 250;

// Lets the user record cards
export class RecordingView {
  app: App;
  data: Data;
  task?: schema.EUserTaskInfo;  // The current card, if any
  taskOrder: string[];  // All task IDs, in display order; this gets compacted on start

  // GUI elements
  div: JQuery<HTMLElement>;
  secondaryControls: JQuery<HTMLElement>;
  doneText: JQuery<HTMLElement>;
  prevButton: JQuery<HTMLElement>;
  nextButton: JQuery<HTMLElement>;
  progressBar: ProgressWidget;
  helpButton: JQuery<HTMLElement>;

  // GUI visibility tracking vs. other app views
  isShown = false;
  seenRecording = false;  // used to skip instructions

  // Next and previous card decorations, for animating
  cardRibbon: JQuery<HTMLElement>;
  cardDiv: JQuery<HTMLElement>;
  prevCardDiv: JQuery<HTMLElement>;
  nextCardDiv: JQuery<HTMLElement>;

  // Audio controls
  buttonBox: JQuery<HTMLElement>;
  recordButton: JQuery<HTMLElement>;
  listenButton: JQuery<HTMLElement>;
  cancelButton: JQuery<HTMLElement>;
  deleteButton: JQuery<HTMLElement>;

  // Recording state tracking
  isRecording: boolean = false;  // the microphone is active
  isStartingRecord: boolean = false;  // the browser is setting up the record pipeline; this takes 700ms on safari
  isStoppingRecord: boolean = false;  // we just finished recording and are uploading or canceling
  isUploadingNew: boolean = false;  // the current upload is for new audio, not replacing a prior recording
  isCanceling: boolean = false;  // the user canceled the recording and we're waiting for Recorder to stop
  isDeleting: boolean = false;  // the user deleted the recording and we're waiting for the server to do it

  // Audio stream and recorder
  audioContext?: AudioContext;
  stream?: MediaStream;
  sourceNode?: MediaStreamAudioSourceNode;
  gainNode?: GainNode;  // a dummy node is required on iOS or else the script processor won't be called
  processorNode?: ScriptProcessorNode;
  recordedWav = new WavBuilder();

  // Playback state tracking for review
  replayingTask?: schema.EUserTaskInfo;
  replayer?: JQuery<HTMLMediaElement>;

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.taskOrder = this.buildTaskOrder();
    this.task = undefined;

    this.div = app.main.eadd('<div id=recordingview />');
    this.div.hide();

    // The cards to read
    this.cardRibbon = this.div.eadd('<div class=cardribbon />');
    this.prevCardDiv = this.cardRibbon.eadd('<div class="card prevcard" />');
    this.cardDiv = this.cardRibbon.eadd('<div class="card thiscard" />');
    this.nextCardDiv = this.cardRibbon.eadd('<div class="card nextcard" />');
    this.prevCardDiv.on('click', async e => await this.gotoTask('prev', true));
    this.nextCardDiv.on('click', async e => await this.gotoTask('next', true));

    // Progress and status
    const statusBox = this.div.eadd('<div class=statuspanel />');
    this.progressBar = new ProgressWidget(statusBox);

    // Card navigation controls
    const navBox = this.div.eadd('<div class=navpanel />');
    this.prevButton = navBox.eadd('<button>Previous card</button>');
    this.doneText = navBox.eadd('<div class=donetext />');
    this.nextButton = navBox.eadd('<button>Next card</button>');
    this.prevButton.on('click', async e => await this.gotoTask('prev', true));
    this.nextButton.on('click', async e => await this.gotoTask('next', true));

    // Record controls at the bottom
    this.buttonBox = this.div.eadd('<div class=controlpanel />');
    this.secondaryControls = this.buttonBox.eadd('<div class=secondarybuttons />');
    const mainControls = this.buttonBox.eadd('<div class=mainbuttons />');
    this.listenButton = this.secondaryControls.eadd('<button class=listen>Replay</button>');
    this.deleteButton = this.secondaryControls.eadd('<button class=delete>Delete</button>');
    this.recordButton = mainControls.eadd('<button class=record>Record</button>');
    this.cancelButton = mainControls.eadd('<button class=cancel>Cancel</button>');
    this.helpButton = mainControls.eadd('<button class=help>?</button>');
    this.recordButton.on('click', async e => await this.toggleRecord());
    this.cancelButton.on('click', async e => await this.toggleRecord(false));
    this.deleteButton.on('click', async e => await this.handleDelete());
    this.listenButton.on('click', async e => await this.toggleListen());
    this.helpButton.on('click', async e => await this.toggleHelp());
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    if (this.isShown === show) {
      return;  // already in the correct state
    }
    this.isShown = show;

    this.div.eshow(show);
    if (show) {
      if (!this.data.user || !this.data.consented) {
        // Not ready to record; bound the user to the right screen
        fork(async () => await this.app.navigateTo(''));

      } else if (this.data.hasMicrophonePermission !== 'yes') {
        // The record view requires the microphone permission to work, so try to get it
        fork(async () => await this.app.navigateTo('/setup?passive=true'));

      } else {
        this.seenRecording = true;
        this.taskOrder = this.buildTaskOrder();  // on first display, compact the recorded tasks to the front
        await this.gotoTask('first', false);  // default to the first unrecorded task
      }
    }
  }

  // Called when the user's tasks or metadata have changed, like after a recording
  async handleUpdate() {
    if (!this.data.user) {
      return;  // Only react to changes after the user is enrolled
    }

    // Merge any new tasks into the current task order.
    for (const task of this.data.tasks) {
      if (this.task && this.task.id == task.id) {
        this.task = task;  // update the current task
      }

      if (this.taskOrder.indexOf(task.id) == -1) {
        // Here's a new task to merge in; new cards go to the back, recorded tasks go into the front
        if (task.recordedTimestamp) {
          this.taskOrder.unshift(task.id);
        } else {
          this.taskOrder.push(task.id);
        }
      }
    }

    // If the task we were looking at has dissappeared, jump them to any valid card
    if (this.task && !this.data.tasksById.has(this.task.id)) {
      await this.gotoTask('first', true);
    }
    this.updateGUI();
  }

  // Returns the ID order of the tasks as an array, putting recorded cards first.
  private buildTaskOrder() {
    const tasks = [...this.data.tasks];
    const orderFn = (a: schema.EUserTaskInfo, b: schema.EUserTaskInfo) => {
      const aHasRecorded = a.recordedTimestamp > 0 ? 1 : 0;
      const bHasRecorded = b.recordedTimestamp > 0 ? 1 : 0;
      if (aHasRecorded != bHasRecorded) {
        return bHasRecorded - aHasRecorded;
      } else {
        return a.recordedTimestamp - b.recordedTimestamp;
      }
    };
    tasks.sort(orderFn);
    return tasks.map(task => task.id);
  }

  // Updates the current card and all the GUI elements based on current task and state
  private updateGUI() {
    const hasTasks = this.data.tasks.length > 0;
    const canNavigate = !this.isRecording && hasTasks && !this.isStartingRecord && !this.isStoppingRecord && !this.isDeleting;
    const prevTask = this.findTask(this.task, -1);
    const nextTask = this.findTask(this.task, +1);
    const isFirst = !prevTask;
    const isLast = !nextTask;
    const isRecorded = !!this.task && this.task.recordedTimestamp > 0;
    const editDeadline = Date.now() - schema.MAX_DELETABLE_RECORDING_AGE_MS;
    const isOldRecording = isRecorded && this.task!.recordedTimestamp < editDeadline;

    // This hack prevents the card UI from flickering during "upload and advance"
    const showRecordedCardControls = isRecorded && !this.isUploadingNew;

    // Navigation is allowed if we're not recording
    this.prevButton.eenable(canNavigate && !isFirst);
    this.nextButton.eenable(canNavigate);
    this.nextButton.text(isLast ? 'Next' : 'Next card');

    // Listening and deleting are allowed on already-recorded cards
    this.buttonBox.eclass('recorded', showRecordedCardControls);
    this.buttonBox.eclass('newcard', !showRecordedCardControls);
    this.deleteButton.eshow(showRecordedCardControls);
    this.listenButton.eshow(showRecordedCardControls && !(isSafari() && this.replayer));
    this.deleteButton.eenable(canNavigate && showRecordedCardControls && !isOldRecording);
    this.listenButton.eenable(canNavigate && showRecordedCardControls);
    this.deleteButton.text(this.isDeleting ? 'Deleting...' : 'Delete');
    this.listenButton.text(this.replayingTask ? 'Stop' : 'Replay');
    this.listenButton.eclass('playing', !!this.replayingTask);

    // Update the recording button state
    this.recordButton.eenable(hasTasks && !this.isStartingRecord && !this.isStoppingRecord && !this.isDeleting && !isOldRecording);
    this.recordButton.eclass('recording', this.isRecording && !this.isStartingRecord && !this.isStoppingRecord);
    if (this.isStartingRecord) {
      this.recordButton.text('Starting...');
    } else if (this.isStoppingRecord) {
      this.recordButton.text(this.isCanceling ? 'Canceling...' : 'Uploading...');
    } else if (this.isRecording) {
      this.recordButton.empty();
      this.recordButton.eadd('<div class=spacer />');
      this.recordButton.eadd('<div class=label />').etext('Recording...');
      this.recordButton.eadd('<div class=recordlight />');
    } else {
      this.recordButton.text(showRecordedCardControls ? 'Record Again' : 'Record');
    }

    // We allow recording to be canceled if it's running
    this.cancelButton.eenable(this.isRecording && !this.isStoppingRecord);
    this.cancelButton.eshow(this.isRecording && !this.isStoppingRecord);
    this.helpButton.eshow(!this.isRecording || this.isStoppingRecord);
    this.helpButton.eenable(!this.isRecording && !this.isStoppingRecord);

    // Change the prev/next cards depending on whether they're recorded
    this.prevCardDiv.evisible(hasTasks && !isFirst);
    this.nextCardDiv.evisible(hasTasks && !isLast);
    if (hasTasks && !isFirst) {
      this.prevCardDiv.eclass('recorded', prevTask.recordedTimestamp > 0);
    }
    if (hasTasks && !isLast) {
      this.nextCardDiv.eclass('recorded', nextTask.recordedTimestamp > 0);
    }

    // Update the look of the current card
    this.cardDiv.eclass('nocards', !hasTasks);
    if (this.task) {
      // Show the current card(s)
      this.cardDiv.eclass('recorded', showRecordedCardControls);
      this.cardDiv.text(this.task.task.prompt);
      this.doneText.html(showRecordedCardControls ? '(this card is done)' : '');

    } else {
      // Show an empty view
      this.cardDiv.text('No assignments');
    }

    // Show progress indicators and card text
    const user = this.data.user;
    if (user) {
      const isDone = user.numCompletedTasks >= user.numTasks;
      if (isDone) {
        this.progressBar.setHtml(`Congratulations! You're all done!`);
      } else {
        this.progressBar.setHtml(`<b>${user.numCompletedTasks}</b> of <b>${user.numTasks}</b> cards <b>done</b>`);
      }
      this.progressBar.setRatio(user.numCompletedTasks / user.numTasks);
      this.progressBar.div.eclass('done', isDone);
    }
  }

  // Returns the first valid, unrecorded task in the order, or the first task otherwise.
  private findFirstTask(): schema.EUserTaskInfo|undefined {
    let first: schema.EUserTaskInfo|undefined = undefined;
    for (const taskId of this.taskOrder) {
      const task = this.data.tasksById.get(taskId);
      if (!first) {
        first = task;
      }
      if (task && !task.recordedTimestamp) {
        return task;
      }
    }
    return first;  // no unrecorded tasks, default to whatever the first valid task was
  }

  // Steps from the given task in the desired direction until we find a valid task, or returns any task.
  private findTask(fromTask: schema.EUserTaskInfo|undefined, step: number, unrecorded = false): schema.EUserTaskInfo|undefined {
    const isValidTask = fromTask && this.data.tasksById.get(fromTask.id) && this.taskOrder.indexOf(fromTask.id) != -1;
    if (!isValidTask) {
      return this.findFirstTask();
    }

    const lastPos = this.taskOrder.length - 1;
    const fromPos = this.taskOrder.indexOf(fromTask.id);

    // And search from there;
    for (let i = fromPos + step; 0 <= i && i <= lastPos; i += step) {
      const task = this.data.tasksById.get(this.taskOrder[i]);
      if (!task) {
        continue;  // task was deleted
      }
      if (unrecorded && task.recordedTimestamp) {
        continue;  // we only want a recorded timestamp
      }
      return task;  // here we are
    }
    return undefined;  // this is the end/start
  }

  // Navigates to the desired task, optionally with an animation, returning true if we landed on a valid card.
  private async gotoTask(where: 'next'|'prev'|'first', animate: boolean): Promise<boolean> {
    if (this.isRecording || this.isStartingRecord || this.isStoppingRecord) {
      return false;  // Don't navigate while we're recording or uploading
    }
    this.app.clearMessage();
    this.stopPlayback();

    if (this.taskOrder.length < 1) {
      return false;  // nothing to do if there are no tasks
    }

    // Choose which task we're going to, and how it will look
    let animateForward = true;
    if (where == 'first') {
      this.task = this.findFirstTask();  // first unrecorded task

    } else if (where == 'prev') {
      animateForward = false;
      this.task = this.findTask(this.task, -1);

    } else if (where == 'next') {
      animateForward = true;
      this.task = this.findTask(this.task, +1);

      if (!this.task) {
        // This was the endof the cards, navigate to the done screen instead.
        await this.app.navigateTo('/done');
        return false;
      }
    }

    if (animate) {
      await this.animateCardChange(animateForward);
    }
    this.updateGUI();
    if (animate && this.task) {
      await this.animateCardText();
    }
    return !!this.task;
  }

  // Animates the cards sliding left or right
  private async animateCardChange(advance: boolean) {
    this.cardRibbon.css('margin-left', '0');
    this.cardRibbon.css('transition', 'margin-left 0.3s ease-in');
    await sleepFrame();
    this.cardRibbon.css('margin-left', advance ? '-175vw' : '175vw');
    await sleep(300);
    this.cardRibbon.css('transition', '');
    this.cardRibbon.css('margin-left', '0');
  }

  // Animates the card text fading in
  private async animateCardText() {
    const isRecorded = !!this.task && this.task.recordedTimestamp > 0;
    const rgb = isRecorded ? '60,60,60' : '0,0,80';
    this.cardDiv.css('transition', '');
    this.cardDiv.css('color', `rgba(${rgb},0)`);
    await sleepFrame();
    this.cardDiv.css('transition', 'color 0.3s ease-in');
    this.cardDiv.css('color', `rgba(${rgb},1)`);
    await sleep(300);
    this.cardDiv.css('transition', '');
  }

  // Starts or stops recording, optionally canceling the upload
  private async toggleRecord(wantUpload: boolean = true) {
    if (this.isStartingRecord || this.isStoppingRecord) {
      return;  // We're already in the middle of changing, do nothing
    
    } else if (this.isRecording) {
      await this.stopRecording(wantUpload);

    } else if (this.task) {
      await this.startRecording();
    }
  }

  // Starts a new recording
  private async startRecording() {
    if (this.processorNode || this.isRecording || this.isStoppingRecord) {
      throw new Error('Unexpectedly already recording');
    }
    const startTime = Date.now();
    this.isStoppingRecord = false;
    this.isStartingRecord = true;
    this.isCanceling = false;
    this.updateGUI();
    await sleepFrame();

    // Reset the stream and create the saving processor
    this.stream = await this.getAudioStream();
    this.recordedWav = new WavBuilder();
    this.setupProcessor();
    await sleep(startTime + MIN_START_DELAY_MS - Date.now());
    this.isStartingRecord = false;
    this.isRecording = true;
    this.updateGUI();
  }

  private async getAudioStream(): Promise<MediaStream> {
    const options = {video: false};
    const deviceId = this.data.loadMicrophoneChoice();
    if (deviceId == '') {
      // Take the default audio input device
      options['audio'] = isSafari() ? {echoCancellation: false} : true;

    } else {
      // Request a specific device
      options['audio'] = {
        'deviceId': {
          'exact': deviceId
        }
      };
      if (isSafari()) {
        options['audio']['echoCancellation'] = false;
      }
    }
    try {
      return await navigator.mediaDevices.getUserMedia(options);

    } catch (e) {
      if (e instanceof OverconstrainedError) {
        // We failed to use the desired microphone, try the default
        try {
          const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});

          // That worked, remove the user's choice and warn them we picked the default.
          this.app.showMessage(`Configured microphone seems unavailable, using the default recording settings.`);
          this.data.saveMicrophoneChoice('');
          return stream;

        } catch (e2) {
          this.app.showMessage(`Unable to record, check microphone permissions?`, 'error');
          throw e2;
        }
      } else {
        throw e;
      }
    }
  }

  // Fix audioContext on iOS
  private ensureAudioContext(): AudioContext {
    if (!this.audioContext) {
      // this member has a different name on iOS
      const ac = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new ac();
    }
    return this.audioContext!;
  }

  // Use the deprecated ScriptProcessor API for buffer saving. Works on older devices.
  private setupProcessor() {
    // on safari this takes 700ms!!!
    this.audioContext = this.ensureAudioContext();
    this.sourceNode = this.audioContext.createMediaStreamSource(this.stream!);
    this.processorNode = this.audioContext.createScriptProcessor(4096, 1, 1);
    this.gainNode = this.audioContext.createGain();
    this.recordedWav.setSampleRate(this.audioContext.sampleRate);

    this.processorNode.onaudioprocess = e => this.handleRecordChunks(e);
    this.sourceNode.connect(this.gainNode);
    this.gainNode.connect(this.processorNode);
    this.processorNode.connect(this.gainNode.context.destination);
  }

  // Called when a chunk of recorded audio data arrives from the media recorder.
  private handleRecordChunks(e: any) {
    if (!this.isRecording && !this.isStartingRecord) {
      throw new Error('Unexpected chunk when not recording');
    }
    this.recordedWav.addData(e.inputBuffer.getChannelData(0));
  }

  // Tears down the processors so no more chunks will arrive.
  private deleteProcessor() {
    if (!this.sourceNode || !this.processorNode || !this.gainNode) {
      return;
    }

    this.sourceNode.disconnect(this.gainNode);
    this.gainNode.disconnect(this.processorNode);
    this.processorNode.disconnect(this.gainNode.context.destination);
    this.sourceNode = undefined;
    this.gainNode = undefined;
    this.processorNode = undefined;
  }

  // Called when the user clicks delete on an already-recorded card
  private async handleDelete() {
    if (this.task) {
      this.isDeleting = true;
      this.updateGUI();
      try {
        await this.data.deleteAudio(this.task);
        this.app.showMessage('Recording deleted.');
      } finally {
        this.isDeleting = false;
      }
      this.updateGUI();
    } else {
      this.app.showMessage('No recording to delete.');
    }
  }

  // Called when the user clicks listen / stop listening on an already-recorded card
  private async toggleListen() {
    if (this.stopPlayback()) {
      return;  // Toggle off
    }

    if (!this.task || this.task.recordedTimestamp === 0) {
      this.app.showMessage('No recording to play.');
      this.updateGUI();
      return;
    }

    // Create a player and start it if possible
    this.replayingTask = this.task;
    const url = await this.getPlaybackURL(this.task);
    this.replayer = this.secondaryControls.eins(`<audio controls src="${url}" />`) as JQuery<HTMLMediaElement>;
    if (!isSafari()) {
      // On safari we leave the widget for the user to click again if they want
      this.replayer.hide();
      this.replayer.on('ended', async e => {
        this.stopPlayback();
      });
      const p = this.replayer.get(0);
      if (p) {
        p.play();  // autoplay from within an async method doesn't work on iOS
      }
    }
    this.updateGUI();
  }

  // Stops any current playback and clears the replayer; does nothing if there's no playback.
  private stopPlayback() {
    if (this.replayer) {
      // We're currently playing, stop
      this.replayer.remove();
      this.replayingTask = undefined;
      this.replayer = undefined;
      this.updateGUI();
      return true;
    }
    return false;
  }

  // Downloads the audio and returns it as a data URL; we do this to handle authentication correctly.
  private async getPlaybackURL(task: schema.EUserTaskInfo): Promise<string> {
    return await Spinner.waitFor(async () => {
      const rsp = await authenticatedFetch('/api/getaudio', {ts: task.recordedTimestamp});
      let contentType = rsp.headers.get('Content-Type');
      if (!contentType || contentType == 'application/octet-stream') {
        contentType = 'audio/wav';  // here's hoping!
      }
      const b64String = toBase64(await rsp.arrayBuffer());
      return `data:${contentType};base64,${b64String}`;
    });
  }

  // Called when the user clicks listen / stop listening on an already-recorded card
  private async toggleHelp() {
    await this.app.navigateTo('/instructions')
  }

  // Called when the user toggles the stop button, to either upload or cancel.
  private async stopRecording(wantUpload: boolean) {
    const stopTime = Date.now();
    this.isCanceling = !wantUpload;
    this.isStoppingRecord = true;
    this.updateGUI();
    this.deleteProcessor();
    await sleep(stopTime + MIN_STOP_DELAY_MS - Date.now());

    let uploaded = false;
    let canceled = false;
    let success = false;
    try {
      const uploadData = this.recordedWav.build();
      this.recordedWav = new WavBuilder();
      if (!this.task) {
        throw new Error('Unexpected missing task, could not save audio.');
      }
      if (!this.isCanceling) {
        this.isUploadingNew = !this.task.recordedTimestamp;
        await this.data.saveAudio(this.task, uploadData, 'audio/wav');
        uploaded = true;
      } else {
        canceled = true;
      }
      success = true;

    } finally {
      // Stop the stream if possible, to try to persuade the browser to stop showing the listening thing
      if (this.stream) {
        this.stream.getTracks().forEach(async track => {
          track.stop();
        });
      }
      this.stream = undefined;
      this.isStartingRecord = false;
      this.isStoppingRecord = false;
      this.isRecording = false;
      this.isCanceling = false;
      this.isUploadingNew = false;

      if (!success) {
        this.updateGUI();  // An exception happened, try to update the GUI nicely as we crash
      }
    }

    if (canceled) {
      this.updateGUI();
      this.app.showMessage('Recording canceled', 'error');
    } else if (!uploaded) {
      this.updateGUI();
      this.app.showMessage('Upload failed, your audio may not be saved.', 'error');
    } else {
      const isValidCard = await this.gotoTask('next', true);
      this.app.showMessage(`Recording uploaded!${isValidCard ? ` Here's the next card.` : ''}`);
    }
  }
}
