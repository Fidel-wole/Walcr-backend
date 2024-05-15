/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Card, CardSchema } from 'src/wallet/schema/card.schema'; // Import Card and CardSchema

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    unique: true,
    validate: {
      validator: (value: string) => /^\+?[0-9]{10,15}$/.test(value),
      message: (props) => `${props.value} is not a valid phone number.`,
    },
    default: null,
  })
  phone_number: string;

  @Prop({ default: null })
  address: string;

  @Prop({ default: null })
  picture: string;

  @Prop()
  password: string;

  @Prop()
  otp_verification_code: number;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop()
  email_verification_token: string;

  @Prop({ default: false })
  isTaskWalker: string;

  @Prop([CardSchema]) // Define cards as an array of CardSchema
  cards: Card[]; // Define cards as an array of Card objects
}

export const UserSchema = SchemaFactory.createForClass(User);
export interface User extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  address: string;
  picture: string;
  password: string;
  otp_verification_code: number;
  isEmailConfirmed: boolean;
  email_verification_token: string;
  isTaskWalker: string;
}
