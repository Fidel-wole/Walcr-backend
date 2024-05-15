/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/service/schema/service.schema';

@Injectable()
export class TaskwalkerTasksService {
  constructor(@InjectModel('Service') private serviceModel: Model<Service>) {}
 
  async getTaskwalkerTasks(riderId: any) {
    try {
      return await this.serviceModel.find({ rider: riderId });
    } catch (err: any) {
      throw err;
    }
  }
}
