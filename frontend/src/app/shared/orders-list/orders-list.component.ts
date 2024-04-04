import { Component, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent {
  @Input()
  orders!: Order[];

  @Input()
  path: string = 'track';

  @Input()
  searchQuery: string = '';

  highlightMatchedText(order: any): any[] {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      return [{ text: order.id, isMatched: false }];
    }
    const searchTerm = this.searchQuery.toLowerCase();
    const text = order.id.toLowerCase();
    const regex = new RegExp(searchTerm, 'g');
    const highlightedParts: any[] = [];

    let startIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const endIndex = match.index;
      if (endIndex > startIndex) {
        highlightedParts.push({
          text: order.id.substring(startIndex, endIndex),
          isMatched: false,
        });
      }
      highlightedParts.push({
        text: order.id.substring(endIndex, endIndex + searchTerm.length),
        isMatched: true,
      });
      startIndex = endIndex + searchTerm.length;
    }

    if (startIndex < order.id.length) {
      highlightedParts.push({
        text: order.id.substring(startIndex),
        isMatched: false,
      });
    }
    return highlightedParts;
  }

  getHighlightColor(isMatched: boolean): string {
    return isMatched ? '#f3ab78' : 'initial';
  }
}
