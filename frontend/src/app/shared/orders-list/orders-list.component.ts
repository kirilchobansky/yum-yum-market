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
  path: string = 'track';

  @Input() 
  searchQuery: string = '';

  highlightMatchedText(order: any): any[] {
    const searchTerm = this.searchQuery;
    const text = order.id;
    const regex = new RegExp(searchTerm, 'gi');
    const parts = text.split(regex);
    const highlightedParts = parts.map((part: string) => {
        return { text: part, isMatched: regex.test(part) };
    });
    return highlightedParts;
  }
}
