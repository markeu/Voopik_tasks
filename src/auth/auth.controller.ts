import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
   return await this.userService.login(userDTO)
  }

  @Post('register')
  async register(@Body() userIdDTO: RegisterDTO) {
    return await this.userService.create(userIdDTO);
  }
}
