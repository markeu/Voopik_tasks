import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

import { Injectable } from '@nestjs/common';
import { Schema } from './schema';
import { defaultData } from './defaults';

@Injectable()
export class Datastore {
  database: lowdb.LowdbSync<Schema>;

  constructor() {
    const adapter = new FileSync('./src//app/data/db.json');
    this.database = lowdb(adapter);
    this.database.defaults(defaultData).write();
  }
}