import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { catchError, throwError, finalize } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { environment } from '../../../environments/environments';

export const networkInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const toasterService = inject(ToastService);
  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
  loaderService.showLoader();
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        try {
          switch (err.status) {
            case 401:
              toasterService.show('error','Unauthorized', 'You are not authorized to access this resource.');
              break;
            case 403:
              toasterService.show('error','Forbidden' ,'You do not have permission to access this resource.');
              break;
          }
        } catch (e) {
          console.log(err.statusText);
          toasterService.show('error','Error' ,'An error occurred while processing your request.');
        }
      }
      return throwError(() => err);
    }),
    finalize(() => loaderService.hideLoader())
  );
};