import { TestBed, async, inject } from '@angular/core/testing';

import { CandeactivateClearsessionGuard } from './candeactivate-clearsession.guard';

describe('CandeactivateClearsessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandeactivateClearsessionGuard]
    });
  });

  it('should ...', inject([CandeactivateClearsessionGuard], (guard: CandeactivateClearsessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
