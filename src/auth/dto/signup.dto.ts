/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { isNotEmpty, isString } from 'class-validator';
export class signUpDto {  
    name: string;
    email: string;
    phone_number: number;
    address: string;
    password: string;
}