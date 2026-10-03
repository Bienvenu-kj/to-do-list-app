import { TestBed } from '@angular/core/testing';

import { TasksManagerService } from './tasks-manager.service';

describe('TasksManagerService', () => {
  let service: TasksManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
