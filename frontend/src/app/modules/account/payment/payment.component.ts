import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css'],
    standalone: false
})
export class PaymentComponent implements OnInit{

  private ordersService = inject(OrderService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  order: Order = new Order();

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(!params.orderId) return;

    this.ordersService.getOrderById(params.orderId).subscribe({
      next: (order) => {
        this.order = order;
      }, 
      error: () => {
        this.router.navigate(['/checkout']);
      }
    })
  }
}
