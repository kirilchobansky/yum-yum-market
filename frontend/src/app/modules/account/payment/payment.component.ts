import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  order: Order = new Order();
  constructor(private orderService: OrderService, private router: Router){}

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        this.router.navigate(['/checkout']);
      }
    })
  }
}
