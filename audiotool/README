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
3. npm install firebase (you may have to retry after Santa+Upvote)

4. npm install firebase-tools  (the instructions say to use -g and im going to try not doing that)

5. cd functions; npm install firebase-functions@latest firebase-admin@9.0.0 @google-cloud/storage express@latest cookie-parser@latest body-parser multer --save

5. ./node_modules/.bin/firebase login
6. ./node_modules/.bin/firebase init    // (installed emulators)
6. ./node_modules/.bin/firebase init firestore
7. ./node_modules/.bin/firebase target:apply hosting yourproject  # https://firebase.googleblog.com/2018/08/one-project-multiple-sites-plus-boost.html


## Deploy to test

8. ./node_modules/.bin/firebase deploy --only hosting:yourproject,functions:audioapp,firestore:indexes
9. https://yourproject.web.app/




## Run Firebase locally

For some reason port 5000 doesn't work on my laptop?

./node_modules/.bin/firebase emulators:start
./node_modules/.bin/firebase serve --host localhost --port 8991 --debug






