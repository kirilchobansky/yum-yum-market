import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit {

  order!: Order;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService){}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(!params.orderId) return;

    this.orderService.getOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })
  }


}
