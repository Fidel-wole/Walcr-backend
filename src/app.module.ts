/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_DB, MONGODB_PASSWORD, MONGODB_USER } from './config/env';
import { WalletModule } from './wallet/wallet.module';
import { ServiceModule } from './service/service.module';
import { AppController } from './app.controller';
import { BookingModule } from './booking/booking.module';
import { TaskWalkerModule } from './task-walker/task-walker.module';
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.cwzz5uc.mongodb.net/${MONGODB_DB}`;
@Module({
  imports: [AuthModule, WalletModule, MongooseModule.forRoot(MONGODB_URI), ServiceModule, BookingModule, TaskWalkerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
