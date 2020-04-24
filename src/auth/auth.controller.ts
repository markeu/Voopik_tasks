import { Param, Put, Post, Get, Delete, Body, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import { Payload } from '../types/payload';
import { UserEntity } from './auth.entity';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UsersService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Post('register')
  async createUser(@Body() user: UserEntity) {
    return this.usersService.createUser(user);
  }

  @Post('login')
  async login(@Body() username: LoginDTO) {
    const user = await this.usersService.findByPayload({username});
    const payload: Payload = {
      username: user.username,
      lastname: user.lastname,
    };
    const token = await this.usersService.signPayload(payload);
    return { user, token };
  }
}




  

