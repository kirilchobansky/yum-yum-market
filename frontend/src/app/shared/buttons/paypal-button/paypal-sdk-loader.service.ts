import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';

declare const paypal: any;

@Injectable({
  providedIn: 'root',
})
export class PaypalSdkLoaderService {
  private loadPromise: Promise<any> | null = null;

  load(): Promise<any> {
    if (typeof paypal !== 'undefined') {
      return Promise.resolve(paypal);
    }

    if (!this.loadPromise) {
      this.loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?currency=${environment.paypalCurrency}&client-id=${environment.paypalClientId}`;
        script.onload = () => resolve(paypal);
        script.onerror = () =>
          reject(new Error('Failed to load the PayPal SDK'));
        document.body.appendChild(script);
      });
    }

    return this.loadPromise;
  }
}
