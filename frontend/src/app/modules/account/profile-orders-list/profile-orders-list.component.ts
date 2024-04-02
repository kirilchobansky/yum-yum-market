import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-profile-orders-list',
  templateUrl: './profile-orders-list.component.html',
  styleUrls: ['./profile-orders-list.component.css']
})
export class ProfileOrdersListComponent implements OnInit {

  newOrders: Order[] | [] = [];
  paidOrders: Order[] | [] = [];
  cancelledOrders: Order[] | [] = [];
  shippedOrders: Order[] | [] = [];
  returnedOrders: Order[] | [] = [];

  constructor(private ordersService: OrderService){}

  ngOnInit(): void {
    this.ordersService.getNewOrdersByUser().subscribe({
      next: (orders) => {
        this.newOrders = orders;
      }
    });

    this.ordersService.getPaidOrders().subscribe({
      next: (orders) => {
        this.paidOrders = orders;
      }
    });

    this.ordersService.getCancelledOrders().subscribe({
      next: (orders) => {
        this.cancelledOrders = orders;
      }
    });

    this.ordersService.getShippedOrders().subscribe({
      next: (orders) => {
        this.shippedOrders = orders;
      }
    });

    this.ordersService.getReturnedOrders().subscribe({
      next: (orders) => {
        this.returnedOrders = orders;
      }
    });
  }
}
