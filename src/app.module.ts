/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_DB, MONGODB_PASSWORD, MONGODB_USER } from "./config/env";
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.cwzz5uc.mongodb.net/${MONGODB_DB}`;
@Module({
  imports: [AuthModule, MongooseModule.forRoot(MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
