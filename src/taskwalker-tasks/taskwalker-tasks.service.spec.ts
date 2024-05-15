import { Test, TestingModule } from '@nestjs/testing';
import { TaskwalkerTasksService } from './taskwalker-tasks.service';

describe('TaskwalkerTasksService', () => {
  let service: TaskwalkerTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskwalkerTasksService],
    }).compile();

    service = module.get<TaskwalkerTasksService>(TaskwalkerTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
