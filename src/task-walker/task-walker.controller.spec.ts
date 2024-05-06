import { Test, TestingModule } from '@nestjs/testing';
import { TaskWalkerController } from './task-walker.controller';

describe('TaskWalkerController', () => {
  let controller: TaskWalkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskWalkerController],
    }).compile();

    controller = module.get<TaskWalkerController>(TaskWalkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
