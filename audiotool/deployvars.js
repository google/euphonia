#!/usr/local/bin/node

// This is a silly little utility that helps deploy.sh by parsing deploy_test/prod.json.

const fs = require('fs');

// The template files and their outputs
const TEMPLATES = {
  './firebase.json.template': './firebase.json',
  './.firebaserc.template': '.firebaserc',
  'websrc/firebaseconfig.ts.template': 'websrc/firebaseconfig.ts',
  'functions/src/firebaseconfig.ts.template': 'functions/src/firebaseconfig.ts',
};

// The variables we parse from the deploy_blah.json file
const VARS = [
  '__EUPHONIA_FIREBASE_API_KEY__',
  '__EUPHONIA_FIREBASE_AUTH_DOMAIN__',
  '__EUPHONIA_FIREBASE_DATABASE_URL__',
  '__EUPHONIA_FIREBASE_PROJECT_ID__',
  '__EUPHONIA_FIREBASE_STORAGE_BUCKET__',
  '__EUPHONIA_FIREBASE_PROJECT_NUMBER__',
  '__EUPHONIA_FIREBASE_HOST__',
  '__EUPHONIA_FIREBASE_STORAGE_RECORDING_PATH__',
  '__EUPHONIA_FIREBASE_STORAGE_CONSENTS_PATH__',
  '__EUPHONIA_ADMIN_EMAILS_LIST__',
];

class VarParser {
  constructor(args) {
    this.args = args;
  }

  // Parses which command is wanted
  run() {
    if (this.args.length < 2) {
      throw new Error('Expected a command; try "gentemplate" or "printvar"');

    } else if (this.args[2] == 'gentemplate') {
      if (this.args.length != 4) {
        throw new Error('Expected an env name, like "deployvars gentemplate prod"');
      }
      this.generateTemplates_(this.args[3]);

    } else if (this.args[2] == 'printvar') {
      if (this.args.length != 5) {
        throw new Error('Expected env and variable names, like "deployvars printvar prod __EUPHONIA_FIREBASE_PROJECT_ID__"');
      }
      const varname = this.args[4];
      const vars = this.parseVars_(this.args[3]);
      if (!vars[varname]) {
        throw new Error(`No value for variable: ${varname}`);
      }
      console.log(vars[varname]);
    }
  }

  // Returns the deplay variables from the given environment.
  parseVars_(envname) {
    const varFilename = `deploy_${envname}.json`;
    return JSON.parse(fs.readFileSync(varFilename));
  }

  generateTemplates_(envname) {
    const vars = this.parseVars_(envname);
    for (const infile in TEMPLATES) {
      const outfile = TEMPLATES[infile];
      let templateText = fs.readFileSync(infile, {encoding:'utf8', flag:'r'});
      for (const varName of VARS) {
        templateText = this.replaceVar(templateText, varName, vars[varName]);
      }
      fs.writeFileSync(outfile, templateText);
    }
  }

  // Replaces all occurances of the variable with the desired string value.
  replaceVar(text, varName, value) {
    value = this.getSubValue(varName, value);

    let result = '';
    let pos = 0;
    let m = text.indexOf(varName);
    while (m != -1 && pos < text.length) {
      result += text.substring(pos, m);
      result += value;
      pos = m + varName.length;
      m = text.indexOf(varName, pos);
    }
    result += text.substring(pos);
    return result;
  }

  // Returns the string to substitute for this variable.
  getSubValue(varName, value) {
    if (varName == '__EUPHONIA_ADMIN_EMAILS_LIST__') {
      // This one is special, treat it like a list of quoted strings.
      if (!value || value.length == 0) {
        return '';
      } else {
        return `"${value.join('", "')}"`;
      }
    }

    if (value == undefined) {
      return '';
    }
    return `${value}`;
  }
}

// Go
const p = new VarParser(process.argv);
p.run();
