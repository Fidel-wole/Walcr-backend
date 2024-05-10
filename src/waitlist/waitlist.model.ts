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
  @Prop({ required:true, unique:true})
  ip_address: string;
  @Prop({ required: true})
  location: string;
  @Prop({ required:true})
  referral_code: string;
}
export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);

// Add additional indexes if needed
WaitlistSchema.index({ email: 1 }); // Index on email
WaitlistSchema.index({ ip_address: 1 }); // Index on ip_address

// Optionally, add a composite index
WaitlistSchema.index({ email: 1, ip_address: 1 });
export interface Waitlist extends mongoose.Document {
  userId: string;
  balance: number;
}
