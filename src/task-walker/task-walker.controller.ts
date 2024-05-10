/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, InternalServerErrorException, NotFoundException, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TaskWalkerDto } from './dto/taskwalker.dto';
import { TaskWalkerService } from './task-walker.service';
import { AuthGuard } from '@nestjs/passport';
import dispatcher from 'src/utils/dispatcher';

@Controller('task-walker')
export class TaskWalkerController {
    constructor(private readonly taskwalkerService: TaskWalkerService) {}

    @Post('/register')
    @UseGuards(AuthGuard())
    async registerTaskWalker(@Req() req, @Res() res, @Body() taskWalkerDto:TaskWalkerDto){
     const userId = req.user.id;
     taskWalkerDto.userId = userId;
     try{
      const user = await this.taskwalkerService.findTaskWalker(userId);
      if (user) {
        // User is already a TaskWalker, return 409 Conflict
        return res.status(HttpStatus.CONFLICT).json({
            message: "You are already a TaskWalker"
        });
    }
        const taskwalker = await this.taskwalkerService.registerTaskWalker(userId, taskWalkerDto);
        if(taskwalker){
            dispatcher.DispatchSuccessMessage(res, "You've sucessfully registered as a Taskwalker")
        }
     }catch(err){
        if (
            err instanceof NotFoundException ||
            err instanceof UnauthorizedException
          ) {
            throw err;
          }
          throw new InternalServerErrorException(
            'An unexpected error occurred during registration.',
          );
     }
    }
}
