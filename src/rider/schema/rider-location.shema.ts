/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

// Define the RiderLocation schema with timestamps
@Schema({
  timestamps: true,
})
export class RiderLocation extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'TaskWalker' })
  riderId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: ['available', 'busy', 'offline'], default: 'offline' })
  status: 'available' | 'busy' | 'offline';

  @Prop({
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // Array of two numbers: longitude and latitude
      required: true,
    },
  })
  location: {
    type: string; // Default type for GeoJSON
    coordinates: [number, number]; // Longitude and Latitude
  };
}

export const RiderLocationSchema = SchemaFactory.createForClass(RiderLocation);
