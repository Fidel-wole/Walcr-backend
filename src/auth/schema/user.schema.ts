/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true, default:null})
  phone_number: number;

  @Prop({default:null })
  address: string;

  @Prop()
  password: string;

  @Prop()
  otp_verification_code: number;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop()
  email_verification_token: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
export interface User extends mongoose.Document {
  name: string;
  email: string;
  phone_number: number;
  address: string;
  password: string;
  otp_verification_code: number;
  isEmailConfirmed: boolean;
  email_verification_token: string;
}
