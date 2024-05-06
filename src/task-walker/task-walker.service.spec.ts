import { Test, TestingModule } from '@nestjs/testing';
import { TaskWalkerService } from './task-walker.service';

describe('TaskWalkerService', () => {
  let service: TaskWalkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskWalkerService],
    }).compile();

    service = module.get<TaskWalkerService>(TaskWalkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
