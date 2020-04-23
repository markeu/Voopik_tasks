import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor() {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

//   async validateUser(payload: Payload) {
//     return await this.userService.findByPayload
//     (payload);
//   }
}
