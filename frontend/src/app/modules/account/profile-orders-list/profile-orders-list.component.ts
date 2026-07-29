import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/core/models/Order';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-orders-list',
  templateUrl: './profile-orders-list.component.html',
  styleUrls: ['./profile-orders-list.component.css'],
  standalone: false,
})
export class ProfileOrdersListComponent implements OnInit {
  private ordersService = inject(OrderService);
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
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

  ngOnInit(): void {
    this.isAdmin = this.authService.currentUser.isAdmin;
    if (this.isAdmin) this.path = 'track';

    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.searchQuery = params['searchText'] || '';
          if (this.searchQuery) {
            return this.ordersService.getOrdersBySearch(this.searchQuery);
          } else {
            return this.ordersService.getAll();
          }
        }),
      )
      .subscribe((orders: Order[]) => {
        if (!this.isAdmin) {
          orders = orders.filter((order) => {
            const orderUserId =
              typeof order.user === 'object'
                ? (order.user as any)._id || (order.user as any).id
                : order.user;
            return orderUserId === this.authService.currentUser.id;
          });
        }
        this.totalOrders = orders.length;

        if (this.searchQuery) {
          this.ordersBySearch = orders;
        } else {
          this.ordersBySearch = [];
        }

        this.newOrders = this.filterOrders(orders, 'NEW');
        this.paidOrders = this.filterOrders(orders, 'PAID');
        this.cancelledOrders = this.filterOrders(orders, 'CANCELLED');
        this.shippedOrders = this.filterOrders(orders, 'SHIPPED');
        this.returnedOrders = this.filterOrders(orders, 'RETURNED');
      });
  }

  filterOrders(orders: Order[], status: string): Order[] {
    if (this.isAdmin) {
      return orders.filter((order) => order.status === status);
    } else {
      return orders.filter((order) => {
        const orderUserId =
          typeof order.user === 'object'
            ? (order.user as any)._id || (order.user as any).id
            : order.user;

        return (
          order.status === status.toUpperCase() &&
          orderUserId === this.authService.currentUser.id
        );
      });
    }
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
