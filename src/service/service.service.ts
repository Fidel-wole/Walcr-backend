/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schema/service.schema';
import { Model } from 'mongoose';
import { ServiceRide } from './schema/service-ride.schema';

@Injectable()
export class ServiceService {
    constructor(
    @InjectModel('Service') private serviceModel: Model<Service>,
    @InjectModel('ServiceRide')
    private serviceRideModel: Model<ServiceRide>){}

    async bookService(data:any){
       try{
        return await this.serviceModel.create(data)
       }catch(err){
        throw err
       }
    }
    async serviceRides(service_ride:any){
        try{
         return await this.serviceRideModel.create({
            service_ride:service_ride
         })
        }catch(err){
         throw err
        }
     }

     async getBookedService(userId){
        try{
            return await this.serviceModel.find({userId:userId})
        }catch(err){
            throw err
        }


     }

     async getServiceRides(){
        try{
            return await this.serviceRideModel.find()
        }catch(err){
            throw err
        }

        
     }
}
