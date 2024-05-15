/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  RiderLocation,
} from './schema/rider-location.shema';

@Injectable()
export class RiderService {
  constructor(
    @InjectModel('RiderLocation')
    private readonly riderLocationModel: Model<RiderLocation>,
  ) {}

  async setStatus(riderId, status, longitude: number, latitude: number) {
    try {
      await this.riderLocationModel.findOneAndUpdate(
        { riderId },
        { status: status },
        { new: true },
      );
  
      // Update location after setting status
      return await this.updateRiderLocation(riderId, longitude, latitude);
    } catch (err) {
      throw err;
    }
  }
  

  async updateRiderLocation(
    riderId: string,
    longitude: number,
    latitude: number,
  ) {
    return await this.riderLocationModel.findOneAndUpdate(
      { riderId },
      { location: { type: 'Point', coordinates: [longitude, latitude] } },
      { new: true },
    );
  }
}
