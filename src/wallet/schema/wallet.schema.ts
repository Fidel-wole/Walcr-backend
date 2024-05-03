/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Wallet {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
  @Prop({ default: 0 })
  balance: number;
}
export const WalletSchema = SchemaFactory.createForClass(Wallet);
export interface Wallet extends mongoose.Document {
  userId: string;
  balance: number;
}
