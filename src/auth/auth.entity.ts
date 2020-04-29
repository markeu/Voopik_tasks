import { Exclude } from 'class-transformer';
// import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class UserEntity extends User {
    @Exclude()
    createdAt: Date = new Date();
  
    @Exclude()
    createdBy: string;
}


