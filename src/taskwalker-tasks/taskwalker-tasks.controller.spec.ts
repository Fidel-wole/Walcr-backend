import { Test, TestingModule } from '@nestjs/testing';
import { TaskwalkerTasksController } from './taskwalker-tasks.controller';

describe('TaskwalkerTasksController', () => {
  let controller: TaskwalkerTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskwalkerTasksController],
    }).compile();

    controller = module.get<TaskwalkerTasksController>(TaskwalkerTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
