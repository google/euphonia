# Euphonia Audio Tool

This is a reference implementation of a web-based tool which can collect audio data from a study participant at home, and store it in Google Cloud Services (specifically Firestore and GCS). This is not an officially supported Google product.

## One-Time Setup Instructions (MacBook)

NOTE: To get this demo fully working for yourself, you will need to set up a Google Cloud account and project. If you already have one, you can fill in its name and credentials in the places where you see "yourproject" and "youtname" in the config files.

1. Install node: https://nodejs.org/en/download/
2. Run the installer to completion. As of this writing I get:
```
- Node.js v16.14.1 to /usr/local/bin/node
- npm v8.5.0 to /usr/local/bin/npm
```
3. (Optional) I would recommend also installing NVM, it helps juggle multiple node versions on your computer: https://github.com/nvm-sh/nvm

4. git clone https://github.com/google/euphonia.git

5. cd euphonia/audiotool

6. cp ./deploy_test.json.example ./deploy_test.json 

7. Edit ./deploy_test.json and fill in your GCP project credentials (or get this file from an existing team member)

8. cp ./deploy_test.json.example ./deploy_local.json 

9. ./node_modules/.bin/firebase login


## Run Firebase locally

1. ./serve.sh
2. http://localhost:8991


## Deploy to test

1. Create a deploy_test.json file by copying the example
2. Create a test_key.json by downloading this file from your Firebase project console (or get this file from a team member)
3. Fill in all the required values in both files, such as project name and hosting site name
4. ./deploy.sh
5. https://yourproject.web.app/


# Compatibility

This implementation is intended to work on a broad set of devices and browsers. That said,
it does use several newer APIs which aren't necessarily supported on every device. Here are some
notes on compatibility based on my testing:

### Fully supported and tested:

- MacOS 12.X+ (Apple Silicon)
  - Chrome 110
  - Safari 16.3
  - Firefox 110
- Windows 10
  - Chrome 110
  - Edge
- Android 11+
  - Chrome 83
- iOS 13
  - Safari 13

### Compatibility Workarounds

- iOS 13 Safari
  - Playback feature not compatible with async methods; implemented a different playback widget on Safari
  - ScriptProcessorNode does not work unless a GainNode is added to the chain

### Known issues

- iOS 13 + Chrome does not work. Must use Safari on old iOS devices.
