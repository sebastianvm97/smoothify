import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isUserAuthGuardGuard } from './is-user-auth-guard.guard';

describe('isUserAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isUserAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
