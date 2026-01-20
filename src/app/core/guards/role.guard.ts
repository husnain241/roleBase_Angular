import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const expectedRole = route.data['role']; // We get this from the route config
  const user = authService.currentUser();

  if (user && user.role === expectedRole) {
    return true;
  } else {
    router.navigate(['/login']); // Or an 'unauthorized' page
    return false;
  }
};