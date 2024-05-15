/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { TaskwalkerTasksService } from './taskwalker-tasks.service';
import { AuthGuard } from '@nestjs/passport';
import dispatcher from 'src/utils/dispatcher';

@Controller('taskwalker-tasks')
export class TaskwalkerTasksController {
    constructor(private readonly taskwalkerTasksService: TaskwalkerTasksService) {}
   @UseGuards(AuthGuard())
   @Get('/')
    async getTaskWalkerTasks(@Req() req, @Res() res){
const userId = req.user.id;
try{
const tasks = await this.taskwalkerTasksService.getTaskwalkerTasks(userId);
if(tasks.length === 0){
    return new NotFoundException("No task yet")
}
dispatcher.DispatchSuccessMessage(res, "Tasks fetched sucessfully", tasks)
}catch(err){
    throw new HttpException(
        'Error getting tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
}
    }
}
