
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { Payload } from '../types/payload';
import { UserEntity } from './auth.entity';
import { UsersRepository } from './auth.repository';


@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createUser(user: UserEntity) {
    const defaults = { name: 'Unnamed Character', createdAt: new Date(), createdBy: 'nick' };
    const newChar = { ...user, ...defaults };

    return this.usersRepository.create(newChar);
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }  

  async findByPayload(payload: Payload) {
    const { lastname } = payload;
    return await this.usersRepository.get(lastname);
  }
}




