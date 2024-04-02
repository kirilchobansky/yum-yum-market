import { Component, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {

  @Input()
  orders!: Order[];

  @Input()
  path: 'payment' | 'track' = 'track';
}
