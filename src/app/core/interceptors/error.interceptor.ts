import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = 'An unexpected error occurred.';

      if (error.status === 0) {
        errorMsg = 'Cannot connect to the server.';
      } else if (error.status === 401) {
        inject(AuthService).logout();
        router.navigate(['/login']);
        errorMsg = 'Session expired. Please log in again.';
      } else if (error.status === 403) {
        errorMsg = 'You do not have permission to perform this action.';
      } else if (error.status === 404) {
        errorMsg = 'Resource not found.';
      } else if (error.status >= 500) {
        errorMsg = 'Server error. Please try again later.';
      } else if (error.error?.message) {
        errorMsg = error.error.message;
      }

      snackBar.open(errorMsg, 'Close', { duration: 3000 });
      console.error('HTTP Error:', error);

      return throwError(() => error);
    })
  );
};