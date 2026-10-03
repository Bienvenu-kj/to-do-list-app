import { TestBed } from '@angular/core/testing';

import { FormManagerService } from './form-manager.service';

describe('FormManagerService', () => {
  let service: FormManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
