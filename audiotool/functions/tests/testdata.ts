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

import { sorted } from '../../commonsrc/util';
import * as schema from '../../commonsrc/schema';

// Snapshots from the real Firestore, to make it easier to add test data
export const TEST_CONSENT1_INFO_JSON: string = `
{"id":"test1","name":"A testing consent","language":"en-US","tags":["foo"],"optional":false,"active":true,"creationTimestamp":1652306125954,"versions":[{"version":2,"liveTimestamp":1652644934000,"description":"next one","creationTimestamp":1652385753910,"numUsers":0},{"version":3,"liveTimestamp":1652386029000,"description":"Another","creationTimestamp":1652386045888,"numUsers":0}]}
`;

export const TEST_CONSENT2_INFO_JSON: string = `
{"id":"test2","name":"Test","language":"en-US","tags":[],"optional":false,"active":true,"creationTimestamp":1652386201850,"versions":[{"version":1,"liveTimestamp":1652386214000,"description":"testing","creationTimestamp":1652386230943,"numUsers":0}]}
`;

let NEXT_ID = 1111111;

export class Deps {
  firestore = new FakeFirestore();
  storage = new FakeStorage();
  auth = fakeAuth;

  constructor() {}
}

class FakeFirestore {
  collections: Map<string, FakeFirestoreCollection> = new Map();
  
  // Helpers to create fake data
  async createTestConsent(infoJson: string) {
    const info = JSON.parse(infoJson);
    const path = schema.consentPath(info.id);
    const doc = this.doc(path);
    await this.runTransaction(async (txn: FakeFirestoreTransaction) => {
      txn.set(doc, {info: infoJson});
    });
  }

  settings() {}  // ignore

  doc(path: string): FakeFirestoreDoc {
    console.log(`FakeFirestore.doc: ${path}`);
    const pathIdx = path.lastIndexOf('/');
    if (pathIdx == -1) {
      throw new Error(`invalid doc path: ${path}`);
    }
    const cpath = path.substring(0, pathIdx);
    return this.collection(cpath).doc(path.substring(pathIdx + 1));
  }

  collection(path: string) {
    console.log(`FakeFirestore.collection: ${path}`);
    let c = this.collections.get(path);
    if (!c) {
      c = new FakeFirestoreCollection(this, path);
      this.collections.set(path, c);
    }
    return c;
  }

  runTransaction<X>(fn: (txn: FakeFirestoreTransaction) => Promise<X>): Promise<X> {
    console.log(`FakeFirestore.runTransaction`);
    const txn = new FakeFirestoreTransaction(this) as any;
    return fn(txn);
  }
}

class FakeFirestoreCollection {
  path: string;
  parent: FakeFirestore;
  docs: Map<string, FakeFirestoreDoc> = new Map();

  constructor(parent: FakeFirestore, path: string) {
    console.log(`FakeFirestoreCollection.new: ${path}`);
    this.parent = parent;
    this.path = path;
  }

  doc(opt_id?: string): FakeFirestoreDoc {
    if (!opt_id) {
      opt_id = `TESTID_${NEXT_ID++}`;
    }
    console.log(`FakeFirestoreCollection.doc: ${opt_id}`);
    return new FakeFirestoreDoc(this, opt_id, {});
  }

  get() {
    console.log(`FakeFirestoreCollection.get: ${this.path}`);
    return new FakeFirestoreQuery([...this.docs.values()]).get();
  }

  where(field: string, op: string, value: any) {
    const results = [...this.get().docs.values()].filter(d => this.filter_(d, field, op, value));
    console.log(`FakeFirestoreCollection.where: ${this.path}: ${field} ${op} ${value} => ${results.length} results`);
    return new FakeFirestoreQuery(results);
  }

  filter_(doc: FakeFirestoreDoc, field: string, op: string, value: any) {
    const dv = doc.data_[field];
    if (op == 'in') {
      const ins = value as any[];
      return ins.indexOf(dv) != -1;
    } else if (op == '==') {
      return dv == value;
    } else {
      throw new Error(`Unsupported where op: ${op}`);
    }
  }

  orderBy(field: string, ascending: boolean = true) {
    console.log(`FakeFirestoreCollection.orderBy: ${this.path}: ${field}`);
    const sortByField = (a: any, b: any): number => {
      const av = a[field];
      const bv = b[field];
      if (av == bv) {
        return 0;
      } else if (av == undefined) {
        return ascending ? -1 : 1;
      } else if (bv == undefined) {
        return ascending ? 1 : -1;
      } else if (typeof av == 'number' && typeof bv == 'number') {
        return ascending ? av - bv : bv - av;
      } else if (typeof av == 'string' && typeof bv == 'string') {
        return ascending ? av.localeCompare(bv) : bv.localeCompare(av);
      } else {
        throw new Error(`Unsupported field comparison: ${field} is of types ${typeof av} and ${typeof bv}`);
      }
    };
    return new FakeFirestoreQuery(sorted([...this.docs.values()], sortByField));
  }
}

class FakeFirestoreQuery {
  docs: any[];

  constructor(docs: any[]) {
    console.log(`FakeFirestoreQuery.new: ${docs.length} results`);
    this.docs = docs;
  }

  limit(n: number) {
    console.log(`FakeFirestoreQuery.limit: ${n} for ${this.docs.length} results`);
    if (this.docs.length > n) {
      return new FakeFirestoreQuery(this.docs.slice(0, n));
    } else {
      return new FakeFirestoreQuery(this.docs);
    }
  }

  get() {
    console.log(`FakeFirestoreQuery.get: ${this.docs.length} items`);
    return {
      docs: this.docs,
      size: this.docs.length
    };
  }
}

class FakeFirestoreDoc {
  parent: FakeFirestoreCollection;
  id: string;
  ref: FakeFirestoreDoc;
  path: string;
  exists: boolean = false;
  data_: any;
  
  constructor(parent: FakeFirestoreCollection, id: string, data: any) {
    console.log(`FakeFirestoreDoc.new: ${parent.path}/${id}`);
    this.parent = parent;
    this.id = id;
    this.ref = this;
    this.path = `${parent.path}/${id}`;
    this.data_ = data;
  }

  data() {
    return this.data_;
  }

  async get() {
    return await this.parent.parent.runTransaction(async txn => {
      return txn.get(this);
    });
  }
}

class FakeFirestoreTransaction {
  parent: FakeFirestore;

  constructor(parent: FakeFirestore) {
    this.parent = parent;
  }

  get(obj: FakeFirestoreDoc|FakeFirestoreQuery) {
    if (obj instanceof FakeFirestoreDoc) {
      const existing = obj.parent.docs.get(obj.path);
      if (existing) {
        console.log(`FakeFirestoreTransaction.get doc: ${obj.path} (exists)`);
        return existing;
      } else {
        console.log(`FakeFirestoreTransaction.get doc: ${obj.path} (not found)`);
        return obj;
      }
    } else if (obj instanceof FakeFirestoreQuery) {
      console.log(`FakeFirestoreTransaction.get query`);
      return obj.get();
    } else {
      throw new Error(`Unrecognized get type: ${typeof obj}`);
    }
  }

  set(doc: FakeFirestoreDoc, data: any) {
    console.log(`FakeFirestoreTransaction.set ${doc.path}`);
    const existing = doc.parent.docs.get(doc.path);
    if (existing) {
      existing.data_ = data;
    } else {
      doc.data_ = data;
      doc.exists = true;
      doc.parent.docs.set(doc.path, doc);
    }
  }

  update(doc: FakeFirestoreDoc, fields: any) {
    console.log(`FakeFirestoreTransaction.update ${doc.path}`);
    const existing = doc.parent.docs.get(doc.path);
    if (existing) {
      for (let field in fields) {
        existing.data_[field] = fields[field];
      }
    } else {
      doc.data_ = fields;
      doc.exists = true;
      doc.parent.docs.set(doc.path, doc);
    }
  }

  delete(doc: FakeFirestoreDoc) {
    console.log(`FakeFirestoreTransaction.delete ${doc.path}`);
    throw new Error('TODO');
  }
}

class FakeStorage {
  buckets: Map<string, FakeStorageBucket> = new Map();
  constructor() {
  }

  bucket(name: string) {
    let b = this.buckets.get(name);
    if (!b) {
      b = new FakeStorageBucket(this);
      this.buckets.set(name, b);
    }
    return b;
  }
}

class FakeStorageBucket {
  parent: FakeStorage;
  files: Map<string, any> = new Map();

  constructor(parent: FakeStorage) {
    this.parent = parent;
  }

  file(path: string) {
    return new FakeStorageFile(this, path);
  }
}

class FakeStorageFile {
  parent: FakeStorageBucket;
  path: string;

  constructor(parent: FakeStorageBucket, path: string) {
    this.parent = parent;
    this.path = path;
  }

  save(contents: any) {
    this.parent.files.set(this.path, contents);
  }

  delete() {
    this.parent.files.delete(this.path);
  }

  createReadStream() {
    throw new Error('TODO');
  }
}

// Stubs out the auth checks that the server usually does, in favor of a fake user.
function fakeAuth(req: any, res: any, next: any) {
  req.user = {
    uid: '__testfbuid__',
    email: 'test@test.com',
    name: 'Testy Tester'
  };
  next();
}
