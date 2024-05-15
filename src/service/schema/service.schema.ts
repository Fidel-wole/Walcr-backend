/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Service {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId:string;
  @Prop({ required: true})
  service_type: string;
  @Prop({ required: true})
  delivery_type: string;
  @Prop({ required: true})
  pickup_address:string;
  @Prop({ required: true})
  destination_address: string;
  @Prop({ required: true})
  delivery_ride: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'TaskWalker'})
  rider:string;
  @Prop({enum: ['In Transit', 'Delivered'], default:"In Transit"})
  status:string
}
export const ServiceSchema = SchemaFactory.createForClass(Service);
export interface Service extends mongoose.Document {
  userId: string;
  delivery_type: string;
  service_type: string;
  pickup_address:string;
  destination_address: string;
  delivery_ride: string;
  rider: string
}
