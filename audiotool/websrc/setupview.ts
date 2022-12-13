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
import {fork} from './util';

// Prompts the user for permission to use the microphone, and allows settings changes.
export class SetupView {
  app: App;
  data: Data;
  passive = false;  // Set to true if the calling GUI wants us to immediately continue.
  fastCheck = false;  // Set to true if we got an instant / non-interactive response from getUserMedia()
  showSettings = false;  // Set to true if the user clicks the settings button

  div: JQuery<HTMLElement>;
  requestText: JQuery<HTMLElement>;
  deniedText: JQuery<HTMLElement>;
  denied2Text: JQuery<HTMLElement>;
  successText: JQuery<HTMLElement>;
  askButton: JQuery<HTMLElement>;
  microphoneSettings: MicrophoneSettingsPanel;
  doneButton: JQuery<HTMLElement>;
  settingsButton: JQuery<HTMLElement>;
  
  constructor(app: App) {
    this.app = app;
    this.data = app.data;
    this.div = app.main.eadd('<div id=setupview />');
    this.div.hide();

    // Basic permission flow
    this.div.eadd('<div class=title />').text(`Microphone Setup`);
    this.requestText = this.div.eadd('<div class=requesttext />').ehtml(`
        In order to record your speech, Euphonia needs permission to use your microphone
        through your web browser. <b>Please click "Allow"</b> to grant use of your microphone.`);
    this.deniedText = this.div.eadd('<div class=deniedtext />').etext(`
        Euphonia could not access your microphone due to a permission problem. You'll need to allow access
        in order to continue.`);
    this.denied2Text = this.div.eadd('<div class=deniedtext />').ehtml(`
        It looks like your microphone permission is blocked. You'll need to <b>allow access</b>
        by clicking the <b>address bar of your browser</b>, and/or <b>reset permission</b> for the microphone.`);
    this.successText = this.div.eadd('<div class=successtext />').ehtml(`
        Your microphone is all set! You can start recording as soon as you're ready.`);

    // Advanced microphone settings, only shown after permission is granted
    this.microphoneSettings = new MicrophoneSettingsPanel(this);

    // Action buttons at the bottom
    const buttons = this.div.eadd('<div class=buttonrow />');
    this.askButton = buttons.eadd('<button class=ask />').etext('Try again');
    this.doneButton = buttons.eadd('<button class=start />').etext('Start recording!');
    this.settingsButton = buttons.eadd('<button class=settings />').etext('Microphone settings');

    this.askButton.on('click', async e => await this.tryMicrophone());
    this.doneButton.on('click', async e => await this.app.navigateTo('/record'));
    this.settingsButton.on('click', async e => await this.toggleSettings());

    // Initial state
    this.updateGUI();
  }

  // Hides or shows the whole display
  async eshow(show: boolean): Promise<void> {
    this.passive = (window.location.hash.indexOf('/setup?passive=true') != -1);
    this.div.eshow(show);
    this.updateGUI();

    if (show) {
      // Let the GUI finish drawing before we pop up the microphone request
      fork(async () => {
        if (this.data.hasMicrophonePermission !== 'yes') {
          await this.tryMicrophone();
        }
        await this.microphoneSettings.build();

        if (this.data.hasMicrophonePermission === 'yes') {
          // Now we can show the user their microphone settings.
          if (this.microphoneSettings.canConfigure) {
            // Don't skip past microphone settings if there is a real choice to make
            this.passive = false;
          }
        
          if (this.passive) {
            // Passive means we want to auto-navigate to recording if we got permission quickly
            // and the user has no microphone to configure
            await this.app.navigateTo('/record');
          }
        }

        this.updateGUI();
      });
    }
  }
  
  async toggleSettings() {
    this.showSettings = true;
    this.updateGUI();
  }

  // Called when the user's login status / enrollment / microphone permission is known.
  async handleUpdate() {
    this.updateGUI();
  }

  // Shows or hides UI elements based on the current permissions
  updateGUI() {
    this.div.eclass('askingpermission', this.data.hasMicrophonePermission === 'maybe');
    this.div.eclass('success', this.data.hasMicrophonePermission === 'yes');
    this.div.eclass('blocked', this.data.hasMicrophonePermission === 'no' && this.fastCheck);
    this.deniedText.eshow(this.data.hasMicrophonePermission === 'no' && !this.fastCheck);
    this.denied2Text.eshow(this.data.hasMicrophonePermission === 'no' && this.fastCheck);
    this.requestText.eshow(this.data.hasMicrophonePermission === 'maybe');
    this.askButton.eshow(this.data.hasMicrophonePermission === 'no');
    this.successText.eshow(this.data.hasMicrophonePermission === 'yes' && !this.showSettings);

    const canConfigure = this.microphoneSettings.canConfigure;
    this.microphoneSettings.div.eshow(this.showSettings);
    this.settingsButton.eshow(this.data.hasMicrophonePermission === 'yes' && !this.showSettings && canConfigure);

    this.doneButton.eenable(this.data.hasMicrophonePermission === 'yes');
    this.doneButton.eshow(!this.showSettings);

    const hasRecordings = this.data.user && this.data.user.numRecordings > 0;
    this.doneButton.etext(hasRecordings ? 'Continue recording!' : 'Start recording!');
  }

  // Attempts to access the microphone and get permission.
  private async tryMicrophone() {
    const requestTime = Date.now();
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
    } catch (e) {
      // Error accessing media, assume we were denied.
      // TODO: inspect this exception for more details
      this.data.hasMicrophonePermission = 'no';
      stream = undefined;
    }
    const waitTime = Date.now() - requestTime;
    this.fastCheck = (waitTime < 100);
    if (!this.fastCheck) {
      // If we had to wait a long time to get permission, it means the user was really asked.
      this.passive = false;
    }

    if (stream) {
      // It worked! Note that we have permission now, and then stop.
      this.data.hasMicrophonePermission = 'yes';
      stream.getTracks().forEach(async track => {
        track.stop();
      });
    }

    this.updateGUI();
  }
}

// Panel of controls for choosing a microphone.
class MicrophoneSettingsPanel {
  app: App;
  data: Data;
  view: SetupView;

  // The HTML UI
  div: JQuery<HTMLElement>;
  defaultCheckbox?: JQuery<HTMLElement> = undefined;
  devicesList?: JQuery<HTMLElement> = undefined;
  deviceCheckboxIds = new Map<string, MediaDeviceInfo>();
  saveButton?: JQuery<HTMLElement> = undefined;
  cancelButton?: JQuery<HTMLElement> = undefined;

  // What we know about the microphone devices
  canConfigure = false;  // true if there are any real choices to make
  hasDefault = false;  // true if there was an explicit "default" device choice
  devices: MediaDeviceInfo[] = [];
  currentDeviceId = '';
  
  constructor(view: SetupView) {
    this.app = view.app;
    this.data = view.app.data;
    this.view = view;
    this.div = this.view.div.eadd('<div class=micsettings />');
    this.div.hide();
  }

  // Fetches the microphone device list and redraws the UI
  async build() {
    this.div.empty();
    await this.queryDevices();
    if (!this.canConfigure) {
      return;  // no real choices to offer
    }

    this.addDefaultCheckbox();
    this.addDeviceList();
    this.addButtons();
    this.updateGUI();
  }

  // Changes the enabled state of choices and buttons based on the user's picks.
  private updateGUI() {
    const isDefault = this.defaultCheckbox!.is(':checked');
    this.devicesList!.eclass('disabled', isDefault);

    let choice: string|undefined = undefined;
    for (const htmlId of this.deviceCheckboxIds.keys()) {
    const radio = $(`#${htmlId}`);
      radio.eenable(!isDefault);
      if (isDefault) {
        radio.echecked(false);
      }
      if (radio.is(':checked')) {
        choice = htmlId;
      }
    }

    this.saveButton!.eenable(isDefault || choice != undefined);
  }

  // We always offer a "default" choice, which just means we won't try to change the device later.
  private addDefaultCheckbox() {
    const defaultrow = this.div.eadd('<div class=defaultrow />');
    this.defaultCheckbox = defaultrow.eadd(`<input type=checkbox id="defaultaudiodevice" />`);
    defaultrow.eadd(`<label for="defaultaudiodevice">Use the default microphone</label>`);
    this.defaultCheckbox.echecked(this.currentDeviceId == '');
    this.defaultCheckbox.on('input', e => this.updateGUI());
  }

  // List of choosable devices
  private addDeviceList() {
    this.devicesList = this.div.eadd('<div class=devices role=radiogroup />');

    this.deviceCheckboxIds.clear();
    let nextDeviceNum = 0;
    for (const device of this.devices) {
      const deviceHtmlId = `audiodeviceradio_${nextDeviceNum++}`;
      this.deviceCheckboxIds.set(deviceHtmlId, device);
      const buttonrow = this.devicesList.eadd('<div />');
      const radio = buttonrow.eadd(`<input name=micdevice type=radio id="${deviceHtmlId}" />`);
      buttonrow.eadd(`<label for="${deviceHtmlId}" />`).text(`${device.label}`);
      radio.echecked(device.deviceId == this.currentDeviceId);
      radio.on('input', e => this.updateGUI());
    }
  }

  // Adds the save and cancel buttons
  private addButtons() {
    const btns = this.div.eadd('<div class=savebuttonrow />')
    this.saveButton = btns.eadd('<button class=save />').etext('Save');
    this.cancelButton = btns.eadd('<button class=cancel />').etext('Cancel');
    this.saveButton.on('click', e => this.saveMicrophoneChoice());
    this.cancelButton.on('click', e => this.closeSettings());
  }

  // Writes the selected microphone's deviceId to local storage and hides the settings panel.
  private saveMicrophoneChoice() {
    if (this.defaultCheckbox!.is(':checked')) {
      this.data.saveMicrophoneChoice('');
    } else {
      for (const htmlId of this.deviceCheckboxIds.keys()) {
        if ($(`#${htmlId}`).is(':checked')) {
          this.data.saveMicrophoneChoice(this.deviceCheckboxIds.get(htmlId)!.deviceId);
          break;
        }
      }
    }

    this.closeSettings();
  }

  // Hides the settings panel.
  private closeSettings() {
    this.view.showSettings = false;
    this.view.updateGUI();
  }

  // Returns a normalized list of the user's audio devices, hiding irrelevant non-choices.
  private async queryDevices(): Promise<void> {
    this.currentDeviceId = this.data.loadMicrophoneChoice();
    const allDevices = [...await navigator.mediaDevices.enumerateDevices()];

    // Chrome on MacOS will show a "default" choice which is identical to the other choice. We should
    // let the user pick "default" but not if it isn't a real alternative to anything.
    this.hasDefault = !!allDevices.filter(d => d.kind == 'audioinput' && d.deviceId == 'default').length;

    // On Firefox this is basically broken; all the labels are blank so showing them to the user does not
    // enable any meaningful choice.
    this.devices = allDevices.filter(d => d.kind == 'audioinput' && d.label.trim() != '' && d.deviceId != 'default');
    this.canConfigure = this.devices.length > 1;

    if (this.currentDeviceId != '') {
      // Validate that the saved choice is available, and switch back to default if it isn't.
      let found = true;
      for (const d of this.devices) {
        if (this.currentDeviceId == d.deviceId) {
          found = true;
        }
      }
      if (!found) {
        this.currentDeviceId = '';
        this.data.saveMicrophoneChoice('');
      }
    }
  }
}
