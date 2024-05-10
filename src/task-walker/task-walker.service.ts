/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TaskWalker } from './schema/taskwalker.schema';
import { User } from 'src/auth/schema/user.schema';
@Injectable()
export class TaskWalkerService {
  constructor(
    @InjectModel('TaskWalker') private taskWalkerModel: Model<TaskWalker>,
    @InjectModel('TaskWalker') private userModel: Model<User>,
  ) {}

  async findTaskWalker(userId: string) {
    try {
        return await this.taskWalkerModel.findOne({ userId }); 
    } catch (err) {
        throw err; 
    }
}

  async registerTaskWalker(userId, data: any) {
    try {
      const taskwalker = await this.taskWalkerModel.create(data);
      await this.userModel.findByIdAndUpdate({userId}, {isTaskWalker:true}, {new:true})
      return taskwalker
    } catch (Err) {
      throw Err;
    }
  }
}
