import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

let pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    pendingRequests++;
    if (pendingRequests === 1) {
      this.spinner.show();
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            pendingRequests--;
            if (pendingRequests === 0) {
              this.spinner.hide();
            }
          }
        },
        (error: any) => {
          pendingRequests--;
          if (pendingRequests === 0) {
            this.spinner.hide();
          }
          console.error('HTTP error:', error);
        }
      )
    );
  }
}