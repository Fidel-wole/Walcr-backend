/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class TaskWalker {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  area: string;

  @Prop({required:true,})
  category:string

  @Prop({ required: true})
  picture: string;

  @Prop({default:null })
  identity_card: string;

  @Prop({required:true})
  driver_license:string
}
export const TaskWalkerSchema = SchemaFactory.createForClass(TaskWalker);
export interface TaskWalker extends mongoose.Document {
area:string;
category:string;
picture:string;
identity_card:string;
driver_license:string;
}
