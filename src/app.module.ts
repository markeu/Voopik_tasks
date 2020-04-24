import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller';
import { UsersController } from './auth/auth.controller';
import { AppService } from './app.service';
import { Datastore } from './db/dataStore';
import { UsersRepository } from './auth/auth.repository';
import { UsersService } from './auth/auth.service';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [AppController, UsersController ],
  providers: [AppService, Datastore, UsersRepository, UsersService],
})

export class AppModule {}
