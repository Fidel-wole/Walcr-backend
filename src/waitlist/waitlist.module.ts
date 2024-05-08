/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistController } from './waitlist.controller';
import { WaitlistSchema } from './waitlist.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Waitlist', schema: WaitlistSchema }])],
  providers: [WaitlistService],
  controllers: [WaitlistController]
})
export class WaitlistModule {}
