/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskWalkerService } from './task-walker.service';
import { TaskWalkerController } from './task-walker.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskWalkerSchema } from './schema/taskwalker.schema';
@Module({
  imports:[AuthModule, MongooseModule.forFeature([{ name: 'TaskWalker', schema: TaskWalkerSchema }
  ])],
  providers: [TaskWalkerService],
  controllers: [TaskWalkerController]
})
export class TaskWalkerModule {}
