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

// A simple HTML progress bar
export class ProgressWidget {
  parent: JQuery<HTMLElement>;
  div: JQuery<HTMLElement>;
  ratio: number = 0;
  html: string = '';
  l10nArgs: string[] = [];

  constructor(parent: JQuery<HTMLElement>, cssClass?: string) {
    this.parent = parent;
    this.div = this.parent.eadd('<div class=progresswidget />');
    this.div.eclass(cssClass, !!cssClass);
    this.draw();
  }

  setRatio(ratio: number) {
    this.ratio = Math.max(0, Math.min(1, ratio));
    this.draw();
  }

  setEIHtml(html: string, ...args: string[]) {
    this.html = html;
    this.l10nArgs = args;
    this.draw();
  }

  private draw() {
    this.div.empty();
    const left = this.div.eadd('<div class=progressleft>&nbsp;</div>');
    left.eclass('zero', this.ratio <= 0);
    left.css('width', `${Math.round(this.ratio * 100)}%`);
    left.css('min-width', `${Math.round(this.ratio * 100)}%`);
    left.eihtml(this.html, ...this.l10nArgs);
  }
}
