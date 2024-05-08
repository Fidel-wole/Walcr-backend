/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RiderLocation, RiderLocationSchema } from './schema/rider-location.shema';

@Injectable()
export class RiderService {
  constructor(
    @InjectModel("RiderLocation") private readonly riderLocationModel: Model<RiderLocation>
  ) {}

  async updateRiderLocation(riderId: string, longitude: number, latitude: number) {
    return await this.riderLocationModel.findOneAndUpdate(
      { riderId },
      { location: { type: 'Point', coordinates: [longitude, latitude] } },
      { new: true }
    );
  }
}
