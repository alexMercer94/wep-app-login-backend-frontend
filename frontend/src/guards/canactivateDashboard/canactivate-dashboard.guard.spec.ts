import { TestBed } from '@angular/core/testing';

import { CanactivateDashboardGuard } from './canactivate-dashboard.guard';

describe('CanactivateDashboardGuard', () => {
  let guard: CanactivateDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanactivateDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
