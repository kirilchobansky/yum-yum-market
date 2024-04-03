import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/models/Order';
import { OrderService } from '../services/order.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit {

  order!: Order;
  isAdmin: boolean = false;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private ordersService: OrderService,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(!params.orderId) return;

    this.ordersService.getOrderById(params.orderId).subscribe({
      next: (order) => {
        if(!order || !order.status) return;
        this.order = order;
      }
    })
    this.isAdmin = this.authService.currentUser.isAdmin;
  };

  payOrderAsAdmin(){
    this.ordersService.payOrderAsAdmin(this.order.id).subscribe(() => {
      this.router.navigate(['/orders']);
      this.toastrService.success('Order was PAID', 'Success');
    })
  };

  cancelOrder(){
    this.ordersService.cancelOrder(this.order.id).subscribe(() => {
      this.router.navigate(['/orders']);
      this.toastrService.success('Order was CANCELLED', 'Success');
    })
  };

  shippedOrder(){
    this.ordersService.shippedOrder(this.order.id).subscribe(() => {
      this.router.navigate(['/orders']);
      this.toastrService.success('Order was SHIPPED', 'Success');
    })
  };

  returnOrder(){
    this.ordersService.returnOrder(this.order.id).subscribe(() => {
      this.router.navigate(['/orders']);
      this.toastrService.success('Order was RETURNED', 'Success');
    })
  };

  deleteOrder(){
    this.ordersService.deleteOrder(this.order.id).subscribe(() => {
      this.router.navigate(['/orders']);
      this.toastrService.success('Order was DELETED', 'Success');
    })
  }

}
