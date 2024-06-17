import { TestBed } from '@angular/core/testing';

import { RegistartionService } from './registartion.service';

describe('RegistartionService', () => {
  let service: RegistartionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistartionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
