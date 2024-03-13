import { Component } from '@angular/core';
import { CartService } from 'src/app/modules/account/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    quantity: number = 0;
    constructor(private cartService: CartService){
      this.cartService.getCartObservable().subscribe(cart => {
        this.quantity = cart.totalCount;
      })
    }
}
