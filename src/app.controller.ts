/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";

@Controller('/')
export class AppController{
    constructor(){}
    
    @Get()
    greeetings(){
        return ("Welcome to Walcr Backend Service")
    }
}