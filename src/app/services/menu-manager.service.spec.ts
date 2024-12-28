import { TestBed } from '@angular/core/testing';

import { MenuManagerService } from './menu-manager.service';

describe('MenuManagerService', () => {
  let service: MenuManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
