import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/models/Order';
import { OrderService } from 'src/app/modules/account/services/order.service';
import { PaypalSdkLoaderService } from './paypal-sdk-loader.service';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css'],
  standalone: false,
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(
    @Inject(OrderService) private orderService: OrderService,
    @Inject(Router) private router: Router,
    @Inject(ToastrService) private toastrService: ToastrService,
    @Inject(PaypalSdkLoaderService)
    private paypalSdkLoader: PaypalSdkLoaderService,
  ) {}

  ngOnInit(): void {
    this.paypalSdkLoader
      .load()
      .then((paypal) => {
        this.renderButtons(paypal);
      })
      .catch((error) => {
        console.error(error);
        this.toastrService.error('Payment is currently unavailable', 'Error');
      });
  }

  private renderButtons(paypal: any): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: environment.paypalCurrency,
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          try {
            const payment = await actions.order.capture();
            this.order.paymentId = payment.id;

            self.orderService.pay(this.order).subscribe({
              next: (orderId) => {
                this.router.navigateByUrl('/track/' + orderId);
                this.toastrService.success(
                  'Payment Saved Successfully',
                  'Success',
                );
              },
              error: (error) => {
                console.error('Payment confirmation failed', error);
                const message = error?.error?.error || 'Payment Save Failed';
                this.toastrService.error(message, 'Payment Failed');
              },
            });
          } catch (error) {
            console.error('PayPal capture failed', error);
            this.toastrService.error(
              'PayPal payment could not be completed',
              'Payment Failed',
            );
          }
        },

        onError: (err: any) => {
          this.toastrService.error('Payment Failed', 'Error');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
