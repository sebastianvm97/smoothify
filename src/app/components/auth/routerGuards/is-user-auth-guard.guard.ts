import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isUserAuthGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authStatus = await  authService.isUserAuth();

  return !authStatus ? router.navigate(['/']) : true; 
};
