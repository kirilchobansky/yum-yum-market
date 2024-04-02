import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent{

  order: Order = new Order();
  constructor(
    private ordersService: OrderService, 
    private router: Router,
    private activatedRoute: ActivatedRoute){}

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
