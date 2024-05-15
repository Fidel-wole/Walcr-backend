/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class PaymentMethod {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ required:true })
  paymentMethodId: string;
}
export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
export interface PaymentMethod extends mongoose.Document {
  userId: string;
  paymentMethodId: string;
}
