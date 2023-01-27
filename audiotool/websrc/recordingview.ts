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
import {sleep, sleepFrame, fork} from './util';
import {ProgressWidget} from './progresswidget';
import * as schema from '../commonsrc/schema';

// Lets the user record cards
export class RecordingView {
  app: App;
  data: Data;
  taskPos: number = -1;  // Which task to show the user
  task?: schema.EUserTaskInfo;  // The current card

  // GUI elements
  div: JQuery<HTMLElement>;
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
  isRecording: boolean = false;
  isStoppingRecord: boolean = false;
  isCanceling: boolean = false;
  isDeleting: boolean = false;
  stream?: MediaStream;
  mediaRecorder?: MediaRecorder;
  chunks: Blob[] = [];

  // Playback state tracking for review
  replayingTask?: schema.EUserTaskInfo;
  replayer?: JQuery<HTMLMediaElement>;

  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    [this.taskPos, this.task] = this.findFirstTask();

    this.div = app.main.eadd('<div id=recordingview />');
    this.div.hide();

    // The cards to read
    this.cardRibbon = this.div.eadd('<div class=cardribbon />');
    this.prevCardDiv = this.cardRibbon.eadd('<div class="card prevcard" />');
    this.cardDiv = this.cardRibbon.eadd('<div class="card thiscard" />');
    this.nextCardDiv = this.cardRibbon.eadd('<div class="card nextcard" />');
    this.prevCardDiv.on('click', async e => await this.gotoTask(this.taskPos - 1, true));
    this.nextCardDiv.on('click', async e => await this.gotoTask(this.taskPos + 1, true));

    // Progress and status
    const statusBox = this.div.eadd('<div class=statuspanel />');
    this.progressBar = new ProgressWidget(statusBox);

    // Card navigation controls
    const navBox = this.div.eadd('<div class=navpanel />');
    this.prevButton = navBox.eadd('<button>Previous card</button>');
    this.doneText = navBox.eadd('<div class=donetext />');
    this.nextButton = navBox.eadd('<button>Next card</button>');
    this.prevButton.on('click', async e => await this.gotoTask(this.taskPos - 1, true));
    this.nextButton.on('click', async e => await this.gotoTask(this.taskPos + 1, true));

    // Record controls at the bottom
    this.buttonBox = this.div.eadd('<div class=controlpanel />');
    const secondaryControls = this.buttonBox.eadd('<div class=secondarybuttons />');
    const mainControls = this.buttonBox.eadd('<div class=mainbuttons />');
    this.listenButton = secondaryControls.eadd('<button class=listen>Replay</button>');
    this.deleteButton = secondaryControls.eadd('<button class=delete>Delete</button>');
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
      if (this.data.hasMicrophonePermission !== 'yes') {
        // The record view requires the microphone permission to work, so try to get it
        fork(async () => await this.app.navigateTo('/setup?passive=true'));
      } else {
        this.seenRecording = true;
        [this.taskPos, this.task] = this.findFirstTask();
        await this.gotoTask(this.taskPos, false);
      }
    }
  }

  // Called when the user's tasks or metadata have changed, like after a recording
  async handleUpdate() {
    if (!this.data.user) {
      return;  // Only react to changes after the user is enrolled
    }

    if (this.taskPos >= this.data.tasks.length) {
      // Tasks have disappeared?? Jump to anywhere valid
      [this.taskPos, this.task] = this.findFirstTask();
      await this.gotoTask(this.taskPos, true);
    } else if (0 <= this.taskPos) {
      this.task = this.data.tasks[this.taskPos];
    }
    this.updateGUI();
  }

  // Updates the current card and all the GUI elements based on current task and state
  private updateGUI() {
    const hasTasks = this.data.tasks.length > 0;
    const canNavigate = !this.isRecording && hasTasks && !this.isStoppingRecord && !this.isDeleting;
    const isFirst = this.taskPos <= 0;
    const isLast = this.taskPos >= this.data.tasks.length - 1;
    const isRecorded = !!this.task && this.task.recordedTimestamp > 0;

    // Navigation is allowed if we're not recording
    this.prevButton.eenable(canNavigate && !isFirst);
    this.nextButton.eenable(canNavigate);
    this.nextButton.text(isLast ? 'Next' : 'Next card');

    // Listening and deleting are allowed on already-recorded cards
    this.buttonBox.eclass('recorded', isRecorded);
    this.buttonBox.eclass('newcard', !isRecorded);
    this.deleteButton.eshow(isRecorded);
    this.listenButton.eshow(isRecorded);
    this.deleteButton.eenable(canNavigate && isRecorded);
    this.listenButton.eenable(canNavigate && isRecorded);
    this.deleteButton.text(this.isDeleting ? 'Deleting...' : 'Delete');
    this.listenButton.text(this.replayingTask ? 'Stop' : 'Replay');
    this.listenButton.eclass('playing', !!this.replayingTask);

    // Update the recording button state
    this.recordButton.eenable(hasTasks && !this.isStoppingRecord && !this.isDeleting);
    this.recordButton.eclass('recording', this.isRecording && !this.isStoppingRecord);
    if (this.isStoppingRecord) {
      this.recordButton.text(this.isCanceling ? 'Canceling...' : 'Uploading...');
    } else if (this.isRecording) {
      this.recordButton.empty();
      this.recordButton.eadd('<div class=spacer />');
      this.recordButton.eadd('<div class=label />').etext('Recording...');
      this.recordButton.eadd('<div class=recordlight />');
    } else {
      this.recordButton.text(isRecorded ? 'Record Again' : 'Record');
    }

    // We allow recording to be canceled if it's running
    this.cancelButton.eenable(this.isRecording && !this.isStoppingRecord);
    this.cancelButton.eshow(this.isRecording && !this.isStoppingRecord);
    this.helpButton.eshow(!this.isRecording && !this.isStoppingRecord);

    // Change the prev/next cards depending on whether they're recorded
    this.prevCardDiv.evisible(hasTasks && !isFirst);
    this.nextCardDiv.evisible(hasTasks && !isLast);
    if (hasTasks && !isFirst) {
      this.prevCardDiv.eclass('recorded', this.data.tasks[this.taskPos - 1].recordedTimestamp > 0);
    }
    if (hasTasks && !isLast) {
      this.nextCardDiv.eclass('recorded', this.data.tasks[this.taskPos + 1].recordedTimestamp > 0);
    }

    // Update the look of the current card
    this.cardDiv.eclass('nocards', !hasTasks);
    if (this.task) {
      // Show the current card(s)
      this.cardDiv.eclass('recorded', isRecorded);
      this.cardDiv.text(this.task.task.prompt);
      this.doneText.html(isRecorded ? '(this card is done)' : '');

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
      } else if (user.numCompletedTasks > 0) {
        this.progressBar.setHtml(`<b>${user.numCompletedTasks}</b> of <b>${user.numTasks}</b> cards <b>done</b>`);
      } else {
        this.progressBar.setHtml('Ready to get started!');
      }
      this.progressBar.setRatio(user.numCompletedTasks / user.numTasks);
      this.progressBar.div.eclass('done', isDone);
    }
  }

  // Returns the first task the user hasn't recorded yet
  private findFirstTask(): [number, schema.EUserTaskInfo?] {
    let pos = 0;
    for (const task of this.data.tasks) {
      if (task.recordedTimestamp === 0) {
        return [pos, task];
      }
      pos++;
    }
    if (this.data.tasks.length > 0) {
      pos = this.data.tasks.length - 1;
      return [pos, this.data.tasks[pos]];
    } else {
      return [-1, undefined];
    }
  }

  // Navigates to the given task by position in the Data.tasks array
  private async gotoTask(pos: number, animate: boolean): Promise<void> {
    if (this.isRecording || this.isStoppingRecord) {
      return;  // Don't navigate while we're recording or uploading
    }
    this.app.clearMessage();

    if (pos >= this.data.tasks.length) {
      // Go off the end of the cards instead
      await this.app.navigateTo('/done');
      return;
    }

    const oldPos = this.taskPos;
    this.taskPos = Math.min(Math.max(pos, 0), this.data.tasks.length - 1);
    this.task = this.data.tasks.length > 0 ? this.data.tasks[this.taskPos] : undefined;
    if (animate && oldPos !== this.taskPos && oldPos !== -1 && this.taskPos !== -1) {
      await this.animateCardChange(oldPos < this.taskPos);
    }
    this.updateGUI();
    if (animate && this.task) {
      await this.animateCardText();
    }
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
    if (this.isStoppingRecord) {
      return;  // We're already in the middle of stopping, do nothing
    
    } else if (this.isRecording) {
      // Stop recording
      if (!this.mediaRecorder) {
        throw new Error('Unexpected missing mediaRecorder');
      }
      this.isCanceling = !wantUpload;
      this.isStoppingRecord = true;
      this.updateGUI();
      this.mediaRecorder.stop();  // This fires the stop event, see below

    } else if (this.task) {
      // Start a new recording
      await this.startRecording();
    }
  }

  // Starts a new recording
  private async startRecording() {
    if (this.mediaRecorder || this.isRecording || this.isStoppingRecord) {
      throw new Error('Unexpectedly already recording');
    }
    this.isStoppingRecord = false;
    this.isRecording = true;
    this.isCanceling = false;
    this.updateGUI();

    this.stream = await this.getAudioStream();
    this.chunks = [];

    // TODO - MediaRecorder does compressed audio, we can use AudioWorklet.

    // basic structure
    // - create a worklet, has to be in a separate file for the browser to load
    // - fill a buffer, this will run in a separate thread
    // - post the data on a "port", which the node can receive back in the main thread
    // - send the data someplace

    this.mediaRecorder = new MediaRecorder(this.stream, {mimeType: 'audio/webm'});
    this.mediaRecorder.addEventListener('dataavailable', e => this.handleRecordChunks(e));
    this.mediaRecorder.addEventListener('stop', async e => await this.handleStopRecording());
    this.updateGUI();
    this.mediaRecorder.start();
  }

  private async getAudioStream(): Promise<MediaStream> {
    const options = {video: false};
    const deviceId = this.data.loadMicrophoneChoice();
    if (deviceId == '') {
      // Take the default audio input device
      options['audio'] = true;
    } else {
      // Request a specific device
      options['audio'] = {
        'deviceId': {
          'exact': deviceId
        }
      };
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

  // Called when a chunk of recorded audio data arrives from the media recorder.
  private handleRecordChunks(e: any) {
    if (!this.isRecording) {
      throw new Error('Unexpected chunk when not recording');
    }
    if (e.data.size > 0) {
      this.chunks.push(e.data);
    }
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
    if (this.replayer && this.replayingTask && this.replayingTask === this.task) {
      // We're currently playing, stop
      this.replayer.remove();
      this.replayingTask = undefined;
      this.replayer = undefined;
      this.updateGUI();
      return;
    }

    // Reset the player
    if (this.replayer) {
      this.replayer.remove();
      this.replayer = undefined;
    }

    if (!this.task || this.task.recordedTimestamp === 0) {
      this.app.showMessage('No recording to play.');
      this.updateGUI();
      return;
    }

    // Create a player and start it
    this.replayingTask = this.task;
    const url = new URL(window.location.origin + `/api/getaudio?ts=${this.task.recordedTimestamp}`);
    this.replayer = $('BODY').eadd(`<audio controls src="${url}" />`) as JQuery<HTMLMediaElement>;
    this.replayer.hide();
    this.replayer.on('ended', async e => {
      // Cleanup
      if (this.replayer) {
        this.replayer.remove();
      }
      this.replayingTask = undefined;
      this.replayer = undefined;
      this.updateGUI();
    });
    const p = this.replayer.get(0);
    if (p) {
      p.play();
    }
    this.updateGUI();
  }

  // Called when the user clicks listen / stop listening on an already-recorded card
  private async toggleHelp() {
    await this.app.navigateTo('/instructions')
  }

  // Called by media recorder when it slews to a stop and no more data is coming.
  private async handleStopRecording() {
    this.updateGUI();
    this.mediaRecorder = undefined;

    let uploaded = false;
    let canceled = false;
    const uploadData = new Blob(this.chunks);
    this.chunks = [];
    try {
      if (!this.task) {
        throw new Error('Unexpected missing task, could not save audio.');
      }
      if (!this.isCanceling) {
        await this.data.saveAudio(this.task, uploadData);
        uploaded = true;
      } else {
        canceled = true;
      }

    } finally {
      // Stop the stream if possible, to try to persuade the browser to stop showing the listening thing
      if (this.stream) {
        this.stream.getTracks().forEach(async track => {
          track.stop();
        });
      }
      this.stream = undefined;
      this.isStoppingRecord = false;
      this.isRecording = false;
      this.isCanceling = false;
    }

    if (canceled) {
      this.updateGUI();
      this.app.showMessage('Recording canceled', 'error');
    } else if (!uploaded) {
      this.updateGUI();
      this.app.showMessage('Upload failed, your audio may not be saved.', 'error');
    } else {
      await this.autoAdvance();
    }
  }

  // Auto-advance to the next card, or congratulate
  private async autoAdvance() {
    // Find the next un-recorded card
    for (let pos = this.taskPos + 1; pos < this.data.tasks.length; pos++) {
      const task = this.data.tasks[pos];
      if (!!task && !task.recordedTimestamp) {
        this.app.showMessage(`Recording uploaded! Here's the next card.`);
        await this.gotoTask(pos, true);
        return;
      }
    }

    // This was the last card, congratulate, or explain missed cards.
    this.app.showMessage(`Recording uploaded!`);
    await this.app.navigateTo('/done');
  }
}
