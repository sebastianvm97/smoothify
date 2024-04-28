import { CanActivateFn } from '@angular/router';

export const isUserAuthGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
