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

  @Prop({ unique: true,
    validate: {
      validator: (value: string) => /^\+?[0-9]{10,15}$/.test(value), // Validate using regex
      message: (props) => `${props.value} is not a valid phone number.`,},
    default:null})
  phone_number: string;

  @Prop({default:null })
  address: string;

  
  @Prop({default:null })
  picture: string;

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
  picture:string;
  password: string;
  otp_verification_code: number;
  isEmailConfirmed: boolean;
  email_verification_token: string;
}
