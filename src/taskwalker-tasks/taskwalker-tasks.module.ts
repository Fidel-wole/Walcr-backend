/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskwalkerTasksService } from './taskwalker-tasks.service';
import { TaskwalkerTasksController } from './taskwalker-tasks.controller';
import { ServiceModule } from 'src/service/service.module';
import { ServiceSchema } from 'src/service/schema/service.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[AuthModule, ServiceModule,  MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }])],
  providers: [TaskwalkerTasksService],
  controllers: [TaskwalkerTasksController]
})
export class TaskwalkerTasksModule {}
