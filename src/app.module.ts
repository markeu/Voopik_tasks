import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Datastore } from './db/dataStore';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Datastore],
})
export class AppModule {}
