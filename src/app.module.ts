/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.cwzz5uc.mongodb.net/${MONGODB_DATABASE}`;
@Module({
  imports: [AuthModule, MongooseModule.forRoot(MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
