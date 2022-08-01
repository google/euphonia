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

// Some simply JQuery conveniences
$.fn.eadd = function(spec) {
  const newChild = $(spec);
  this.append(newChild);
  return newChild;
};

$.fn.eins = function(spec) {
  const newChild = $(spec);
  this.prepend(newChild);
  return newChild;
};

// Sets the text contents of this node and returns it
$.fn.etext = function(text): JQuery<HTMLElement> {
  this.text(text);
  return this;
};

// Sets the textual value of this input node and returns it
$.fn.evalue = function(text): JQuery<HTMLElement> {
  this.val(text);
  return this;
};

$.fn.eshow = function(show) {
  if (show) {
    this.show();
  } else {
    this.hide();
  }
};

$.fn.evisible = function(show) {
  if (show) {
    this.css('opacity', '1');
  } else {
    this.css('opacity', '0');
  }
};

$.fn.eenable = function(enabled: boolean) {
  this.prop('disabled', !enabled);
};

$.fn.eclass = function(className: string|undefined, wanted: boolean) {
  if (!className) {
    return;
  }
  if (wanted) {
    this.addClass(className);
  } else {
    this.removeClass(className);
  }
};

$.fn.efade = async function(show) {
  if (show) {
    this.show();
    await fadeIn(this);
  } else {
    await fadeOut(this);
    this.hide();
  }
};

// Adds a row to a table.
$.fn.eaddtr = function(cellNodes: JQuery<HTMLElement>[], rowClass?: string): JQuery<HTMLElement>[] {
  const tr = this.eadd('<tr />');
  const result:JQuery<HTMLElement>[] = [];
  tr.eclass(rowClass, !!rowClass);
  for (let cell of cellNodes) {
    const td = tr.eadd('<td />');
    td.append(cell);
    result.push(cell);
  }
  return result;
}

// Awaitable sleep function.
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Awaits the browser's next animation frame.
export function sleepFrame() { 
  return new Promise(requestAnimationFrame); 
}

// Eases an opacity change one div over time.
export async function animateOpacity(div: JQuery, start: number, end: number, opt_speed?: number) {
  if (!opt_speed) {
    opt_speed = 0.3;
  }
  div.css('opacity', `${start}`);
  await sleep(100);
  div.css('transition', `opacity ease-in ${opt_speed}s`);
  div.css('opacity', `${end}`);
  await sleep(Math.round(opt_speed * 1000));
  div.css('transition', '');
}

export async function fadeIn(div: JQuery, opt_speed?: number) {
  await animateOpacity(div, 0, 1, opt_speed);
}

export async function fadeOut(div: JQuery, opt_speed?: number) {
  await animateOpacity(div, 1, 0, opt_speed);
}

export function toURL(path: string, opt_args?: any): URL {
  const url = new URL(window.location.origin + path);
  if (opt_args) {
    for (let k in opt_args) {
      url.searchParams.append(k, opt_args[k]);
    }
  }
  return url;
}

// Performs a network fetch to the server, providing the signed-in user's token. Throws an exception on non-200 responses.
export async function authenticatedFetch(path: string, opt_args?: any, opt_method?: string, opt_rawBody?: ArrayBuffer) {
  const method = opt_method == null ? 'get' : opt_method;
  const args = opt_args == null ? {} : opt_args;
  const options: RequestInit = { method };
  const url = toURL(path, args);
  if (opt_rawBody) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/octet-stream');
    options.headers = headers;
    options.body = opt_rawBody;
  }
  const token = await firebase.auth().currentUser.getIdToken();
  document.cookie = '__session=' + token + ';max-age=3600;path=/';
  const rsp = await fetch(url.toString(), options);
  if (!rsp.ok) {
    // The server will usually give application errors in JSON format
    const contentType = rsp.headers.get('content-type');
     if (contentType && contentType.includes('application/json')) {
      const message = await rsp.json();
      throw new Error(message[0]);
    }
    throw new Error('Error during request');
  }
  return rsp;
}

// Same as above, but POSTs a JSON body and receives JSON blob, which it parses.
export async function postAsJson<X>(path: string, jsonObj: any): Promise<X> {
  const body = new TextEncoder().encode(JSON.stringify(jsonObj));
  const rsp = await authenticatedFetch(path, {}, 'post', body);
  return await rsp.json();
}

// Shows a fire-and-forget floating message to the user.
export function toast(message: string, duration: number = 1000, cssClasses: string = 'toast') {
  setTimeout(async x => {
    const div = $('BODY').eins(`<div class="${cssClasses}" />`);
    div.text(message);
    await fadeIn(div);
    await sleep(duration);
    await fadeOut(div);
    div.remove();
  }, 1);
}

export function errorToast(message: string) {
  toast(message, 5000, 'toast errortoast');
}

// Blocks out the UI with a global modal spinner
export class Spinner {
  waiters: number = 0;
  overlay?: JQuery<HTMLElement>;
  div?: JQuery<HTMLElement>;

  static self?: Spinner;

  static async waitFor<X>(fn: () => Promise<X>): Promise<X> {
    if (!Spinner.self) {
      Spinner.self = new Spinner();
    }
    Spinner.self.waiters++;
    try {
      return await fn();
    } finally {
      Spinner.self.waiters--;
      if (Spinner.self.waiters <= 0) {
        // Last waiter out removes the current spinner
        Spinner.self.remove();
        Spinner.self = undefined;
      }
    }
  }

  constructor() {
    this.overlay = $('BODY').eadd('<div class=spinneroverlay />');
    this.div = this.overlay.eadd(`<div class=spinner />`);
  }

  remove() {
    this.overlay!.remove();
    this.overlay = undefined;
    this.div = undefined;
  }
}

// Simple manager class for an HTML5 dropdown
export class Dropdown {
  select: JQuery<HTMLElement>;
  options: JQuery<HTMLElement>[] = [];

  constructor(parent: JQuery<HTMLElement>, cssClass?: string) {
    this.select = parent.eadd(`<select class="${cssClass ? cssClass : ''}" />`);
  }

  addOption(value: string, label: string): JQuery<HTMLElement> {
    const option = this.select.eadd('<option />');
    this.options.push(option);
    option.text(label);
    option.val(value);
    return option;
  }

  // Returns the value of the selected option.
  getSelected(): string|undefined {
    for (let option of this.options) {
      if (option.is(':selected')) {
        return `${option.val()}`;
      }
    }
    return undefined;
  }

  onchange(fn: (e: any) => Promise<void>) {
    this.select.on('change', fn);
  }
}