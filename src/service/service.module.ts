/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './schema/service.schema';
import { ServiceRideSchema } from './schema/service-ride.schema';

@Module({
  imports:[AuthModule, MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema },
  { name: 'ServiceRide', schema: ServiceRideSchema },
  ])],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
