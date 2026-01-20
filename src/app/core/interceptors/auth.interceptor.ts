import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.currentUser();

  // If we have a user token, we clone the request and add the Header
  if (user && user.token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
    return next(clonedRequest);
  }

  // If no token, just pass the original request through
  return next(req);
};