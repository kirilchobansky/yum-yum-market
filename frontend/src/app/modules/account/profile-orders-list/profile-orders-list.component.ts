import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-orders-list',
  templateUrl: './profile-orders-list.component.html',
  styleUrls: ['./profile-orders-list.component.css'],
})
export class ProfileOrdersListComponent implements OnInit {
  newOrders: Order[] = [];
  paidOrders: Order[] = [];
  cancelledOrders: Order[] = [];
  shippedOrders: Order[] = [];
  returnedOrders: Order[] = [];
  ordersBySearch: Order[] = [];

  totalOrders: number = 0;

  path = 'payment';
  searchQuery: string = '';

  isAdmin: boolean = false;
  showNewOrders: boolean = false;
  showPaidOrders: boolean = false;
  showCancelledOrders: boolean = false;
  showShippedOrders: boolean = false;
  showReturnedOrders: boolean = false;

  constructor(
    private ordersService: OrderService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.currentUser.isAdmin;
    if (this.isAdmin) this.path = 'track';

    const orderTypes: string[] = [
      'new',
      'paid',
      'cancelled',
      'shipped',
      'returned',
    ];

    const orderObservables: { [key: string]: Observable<Order[]> } = {};
    orderTypes.forEach((type) => {
      orderObservables[type] = this.activatedRoute.params.pipe(
        switchMap((params) => {
          const searchParam = params['searchText'];
          this.searchQuery = searchParam;
          if (searchParam) {
            return this.ordersService.getOrdersBySearch(searchParam);
          } else {
            return this.ordersService.getAll();
          }
        })
      );
    });

    this.activatedRoute.params.pipe(
      switchMap((params) => {
        const searchParam = params['searchText'];
        this.searchQuery = searchParam;
        if (searchParam) {
          return this.ordersService.getOrdersBySearch(searchParam);
        } else {
          return this.ordersService.getAll();
        }
      })
    ).subscribe((orders: Order[]) => {
      if(!this.isAdmin){
        orders = orders.filter((order) => order.user === this.authService.currentUser.id);
      }  
      this.totalOrders = orders.length;
    });

    Object.keys(orderObservables).forEach(
      (type: keyof typeof orderObservables) => {
        orderObservables[type].subscribe((orders: Order[]) => {
          const filteredOrders = this.filterOrders(
            orders,
            type.toString().toUpperCase()
          );
          (this as any)[type + 'Orders'] = filteredOrders;
        });
      }
    );
  }

  filterOrders(orders: Order[], status: string): Order[] {
    if (this.isAdmin) {
      return orders.filter((order) => order.status === status);
    } else {
      return orders.filter(
        (order) =>
          order.status === status.toUpperCase() &&
          order.user === this.authService.currentUser.id
      );
    }
  };

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
