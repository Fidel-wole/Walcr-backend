/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { isNotEmpty, isString } from 'class-validator';
export class signUpDto {  
    firstname: string;
    lastname:string;
    email: string;
    phone_number: string;
    address: string;
    password: string;
}