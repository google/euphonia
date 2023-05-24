#!/bin/bash
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


set -e

# Generate template files for local deployment
node ./deployvars.js gentemplate "local"

# Compile
npm install
npm run build
cd functions
npm install
npm run build
cd ..

# Deploy third party dependencies as a library
cp -r third_party public/lib

# For local development only, copy the source map
cp -r -f websrc public/websrc

# Launch the local emulators
./node_modules/.bin/firebase serve --host localhost --port 8991
