/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ServiceRide {
  @Prop({ required: true})
  service_ride: string;
}
export const ServiceRideSchema = SchemaFactory.createForClass(ServiceRide);
export interface ServiceRide extends mongoose.Document {
    service_ride: string;
}