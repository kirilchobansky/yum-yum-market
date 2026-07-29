import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private pendingRequests = 0;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.pendingRequests++;

    if (this.pendingRequests === 1) {
      this.spinner.show();
    }

    return next.handle(request).pipe(
      tap({
        error: () => {
          this.clearPendingHide();
        },
      }),
      finalize(() => {
        this.pendingRequests = Math.max(0, this.pendingRequests - 1);

        if (this.pendingRequests === 0) {
          this.clearPendingHide();
          this.hideTimeout = setTimeout(() => {
            this.spinner.hide();
            this.hideTimeout = null;
          }, 0);
        }
      }),
    );
  }

  private clearPendingHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
