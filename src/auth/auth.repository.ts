
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { plainToClass } from 'class-transformer';
import { Datastore } from '../db/dataStore';
import { UserEntity } from './auth.entity';

@Injectable()
export class UsersRepository {
  constructor(private datastore: Datastore) {}

  async getList(params: any = {}) {
    let db = this.datastore.db.get('characters');
    if (params.sort) {
      db = db.sortBy(params.sort);
    } else {
      db = db.sortBy(['clan', 'name']);
    }

    if (params.page && params.pageSize) {
      db = db.slice((params.page - 1) * params.pageSize).take(params.pageSize);
    }

    return await db.value().map(x => {
      const entity = plainToClass(CharacterEntity, x, {
        ignoreDecorators: true
      });
      return entity;
    });
  }

  async get(id: string) {
    const dbRecord = await this.datastore.database
      .get('characters')
      .find(x => x.id === id)
      .value();
    if (dbRecord) {
      dbRecord.createdAt = new Date(dbRecord.createdAt);
      return plainToClass(CharacterEntity, dbRecord, {
        ignoreDecorators: true
      });
    }
  }

  async create(user: UserEntity) {
    this.validate(user);
    
    this.datastore.database
      .get('users')
      .push(user)
      .write();
    return await user;
  }

  async update(id: string, user: UserEntity) {
    this.validate(user);
    this.datastore.database
      .get('users')
      .find(x => (x.username as any) === id)
      .assign(user)
      .write();
    return await user;
  }

  async delete(id: string) {
    this.datastore.database
      .get('users')
      .remove({ username })
      .write();
  }

  private validate(user: UserEntity) {
    if (!user.username) {
      throw new Error('DBConstraint error: username is required');
    }
    if (!user.firstname) {
        throw new Error('DBConstraint error: firstname is required');
      }
      if (!user.lastname) {
        throw new Error('DBConstraint error: lastname is required');
      }
    if (!user.createdBy) {
      throw new Error('DBConstraint error: CreatedBy is required');
    }
    if (!user.createdAt || !_.isDate(user.createdAt)) {
      throw new Error('DBConstraint error: CreatedAt is invalid or not sent');
    }
  }
}