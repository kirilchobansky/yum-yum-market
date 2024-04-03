import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';
import { AuthService } from 'src/app/auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-orders-list',
  templateUrl: './profile-orders-list.component.html',
  styleUrls: ['./profile-orders-list.component.css']
})
export class ProfileOrdersListComponent implements OnInit {

  newOrdersByUser: Order[] | [] = [];
  paidOrdersByUser: Order[] | [] = [];
  cancelledOrdersByUser: Order[] | [] = [];
  shippedOrdersByUser: Order[] | [] = [];
  returnedOrdersByUser: Order[] | [] = [];
  newOrders: Order[] | [] = [];
  paidOrders: Order[] | [] = [];
  cancelledOrders: Order[] | [] = [];
  shippedOrders: Order[] | [] = [];
  returnedOrders: Order[] | [] = [];
  isAdmin: boolean = false;
  totalOrders!: number;
  totalOrdersByUser!: number;

  showNewOrders: boolean = false;
  showPaidOrders: boolean = false;
  showCancelledOrders: boolean = false;
  showShippedOrders: boolean = false;
  showReturnedOrders: boolean = false;

  constructor(
    private ordersService: OrderService,
    private authService: AuthService){}

  ngOnInit(): void {
    this.isAdmin = this.authService.currentUser.isAdmin;

    forkJoin([
      this.ordersService.getNewOrdersByUser(),
      this.ordersService.getPaidOrdersByUser(),
      this.ordersService.getCancelledOrdersByUser(),
      this.ordersService.getShippedOrdersByUser(),
      this.ordersService.getReturnedOrdersByUser(),
      this.ordersService.getNewOrders(),
      this.ordersService.getPaidOrders(),
      this.ordersService.getCancelledOrders(),
      this.ordersService.getShippedOrders(),
      this.ordersService.getReturnedOrders()
    ]).subscribe({
      next: ([newOrdersByUser, paidOrdersByUser, cancelledOrdersByUser, shippedOrdersByUser, returnedOrdersByUser,
               newOrders, paidOrders, cancelledOrders, shippedOrders, returnedOrders]) => {
        this.totalOrders = newOrders.length + paidOrders.length + cancelledOrders.length +
                           shippedOrders.length + returnedOrders.length;
        this.totalOrdersByUser = newOrdersByUser.length + paidOrdersByUser.length + cancelledOrdersByUser.length +
                           shippedOrdersByUser.length + returnedOrdersByUser.length;                   
        this.newOrdersByUser = newOrdersByUser;
        this.paidOrdersByUser = paidOrdersByUser;
        this.cancelledOrdersByUser = cancelledOrdersByUser;
        this.shippedOrdersByUser = shippedOrdersByUser;
        this.returnedOrdersByUser = returnedOrdersByUser;
        this.newOrders = newOrders;
        this.paidOrders = paidOrders;
        this.cancelledOrders = cancelledOrders;
        this.shippedOrders = shippedOrders;
        this.returnedOrders = returnedOrders;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }


  toggleOrdersVisibility(section: string) {
    switch (section) {
      case 'new':
        this.showNewOrders = !this.showNewOrders;
        break;
      case 'paid':
        this.showPaidOrders = !this.showPaidOrders;
        break;
      case 'cancelled':
        this.showCancelledOrders = !this.showCancelledOrders;
        break;
      case 'shipped':
        this.showShippedOrders = !this.showShippedOrders;
        break;
      case 'returned':
        this.showReturnedOrders = !this.showReturnedOrders;
        break;
      default:
        break;
    }
  }
}
