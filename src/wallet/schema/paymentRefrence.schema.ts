/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class PaymentRefrence {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({required: true, default: 0 })
  amount: number;
}
export const PaymentSchema = SchemaFactory.createForClass(PaymentRefrence);
export interface PaymentSchema extends mongoose.Document {
  userId: string;
  amount: number;
}
