import { Module } from '@nestjs/common';
import { TaskWalkerService } from './task-walker.service';
import { TaskWalkerController } from './task-walker.controller';

@Module({
  providers: [TaskWalkerService],
  controllers: [TaskWalkerController]
})
export class TaskWalkerModule {}
