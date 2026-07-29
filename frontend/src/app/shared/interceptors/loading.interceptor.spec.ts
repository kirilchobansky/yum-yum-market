import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;
  let spinnerService: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(() => {
    spinnerService = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LoadingInterceptor,
        { provide: NgxSpinnerService, useValue: spinnerService },
      ],
    });

    interceptor = TestBed.inject(LoadingInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('shows the spinner for the first active request and hides it when the last one completes', () => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: () => of({}) as any,
    };

    interceptor.intercept(request, next).subscribe();

    expect(spinnerService.show).toHaveBeenCalled();
    expect(spinnerService.hide).not.toHaveBeenCalled();
  });
});
