import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  order: Order | null = null;
  paidOrders: Order[] | [] = [];

  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      }
    });

    this.orderService.getPaidOrders().subscribe({
      next: (orders) => {
        this.paidOrders = orders;
      }
    })
  }
}
