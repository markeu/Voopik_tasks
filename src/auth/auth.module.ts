import { Module } from '@nestjs/common';

// import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../shared/user.service';
import { DatabaseService } from '../global/database/database.service'
import { GlobalModule } from '../global/global.module'
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [GlobalModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, DatabaseService],
})
export class AuthModule {}
