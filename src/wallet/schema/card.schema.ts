/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Card extends Document {
    userId:{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }
card:{
    item:[
        {
            card_holder_name:{type:string, required:true},
            card_number:{type:string, required:true},
            exp_month:{type:string, required:true},
            exp_year:{type:string, required:true},
            brand:{type:string, required:true},
        }
    ]
}
}

export const CardSchema = SchemaFactory.createForClass(Card);
