/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RiderLocationSchema } from './schema/rider-location.shema';
import { LocationGateway } from './location.gateway';

@Module({
  imports:[AuthModule, MongooseModule.forFeature([{ name: 'RiderLocation', schema: RiderLocationSchema }])],
  providers: [RiderService, LocationGateway],
  controllers: [RiderController]
})
export class RiderModule {}
