/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URI } from './config/env';
@Module({
  imports: [AuthModule, MongooseModule.forRoot(MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
