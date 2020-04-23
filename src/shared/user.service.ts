import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userDto: RegisterDTO): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  
}
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import {DatabaseService} from '../global/database/database.service'
// import { AuthService } from '../auth/auth.service';
// import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
// import { Payload } from '../types/payload';


// @Injectable()
// export class UserService {
//   constructor(
//     private readonly databaseService: DatabaseService,
//     private readonly authService: AuthService) 
//     {
//       this.databaseService.getDatabase().defaults({
//           login: [],
//           register: []
//       }).write();
//   }

//   getTable() {
//     return this.databaseService.getDatabase().get('users');
// }
  
//   async create(userDTO: RegisterDTO) {
//     const { username, password, firstname, lastname, } = userDTO;
//     const {user} = this.getTable().find({ name: username });
//     if (user) {
//       throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
//     }

//     try {
//       this.getTable().push({
//         username,
//         password,
//         firstname,
//         lastname
//       }).write()
//     } catch (error) {
//       throw error;
//     }
//   }

//   async login(userIdDTO: LoginDTO){
//     const { username } = userIdDTO;
//     const {user} = this.getTable().find({ name: username });
//     const payload: Payload = {
//       username: user.username,
//     };
    
//     const token = await this.authService.signPayload(payload);
//     return { user, token };
//   }

//   // async find() {
//   //   return await this.getTable().find({ name: username });
//   // }

//   // async findByLogin(userDTO: LoginDTO) {
//   //   const { username, password } = userDTO;
//   //   const user = await this.userModel
//   //     .findOne({ username })
//   //     .select('username password seller created address');
//   //   if (!user) {
//   //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
//   //   }

//   //   if (await bcrypt.compare(password, user.password)) {
//   //     return this.sanitizeUser(user);
//   //   } else {
//   //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
//   //   }
//   // }

//   // async findByPayload(payload: Payload) {
//   //   const { username } = payload;
//   //   return await this.userModel.findOne({ username });
//   // }

//   // private initDatabase() {
//   //   try {
//   //     const adapter = new FileAsync<MediaDto[]>('src/db.json');
//   //     this.db = lowdb(adapter);
//   //   }
//   //   catch(e) {
//   //     console.log(e);
//   //   }
//   // }

//   // sanitizeUser(user: User) {
//   //   const sanitized = user.toObject();
//   //   delete sanitized['password'];
//   //   return sanitized;
//   //   // return user.depopulate('password');
//   // }
// }
