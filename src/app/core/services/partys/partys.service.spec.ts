import { TestBed } from '@angular/core/testing';

import { PartysService } from './partys.service';

describe('PartysService', () => {
  let service: PartysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
