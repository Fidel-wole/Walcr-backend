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
    exp_month: number;

    @Prop({ required: true })
    exp_year: number;

    @Prop({ required: true })
    brand: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
