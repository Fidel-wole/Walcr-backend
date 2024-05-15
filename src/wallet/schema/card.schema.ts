/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
    @Prop({ required: true })
    card_holder_name: string;

    @Prop({ required: true })
    card_number: number;

    @Prop({ required: true })
    card_expiry_date: Date;

    @Prop({ required: true })
    cvv: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
