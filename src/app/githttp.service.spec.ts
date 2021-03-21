import { TestBed } from '@angular/core/testing';

import { GithttpService } from './githttp.service';

describe('GithttpService', () => {
  let service: GithttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
