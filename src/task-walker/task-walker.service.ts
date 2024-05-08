/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskWalker } from './schema/taskwalker.schema';
//import { RiderLocation } from './schema/rider-location.shema';

@Injectable()
export class TaskWalkerService {
  constructor(
    @InjectModel('TaskWalker') private serviceModel: Model<TaskWalker>,
  ) {}

  async registerTaskWalker(data: any) {
    try {
      return await this.serviceModel.create(data);
    } catch (Err) {
      throw Err;
    }
  }
}
