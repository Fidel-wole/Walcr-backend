/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Waitlist {
  @Prop({ required: true, unique:true })
  email: string;
  @Prop({ required:true})
  ip_address: string;
  @Prop({ required: true})
  location: string;
  @Prop({ required:true})
  referral_code: string;
}
export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
export interface Waitlist extends mongoose.Document {
  userId: string;
  balance: number;
}
