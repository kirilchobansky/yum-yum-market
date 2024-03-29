import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/core/models';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

    cart!: Cart;
    constructor(private cartServise: CartService){
      this.cartServise.getCartObservable().subscribe(cart => {
        this.cart = cart;
      })
    }

    removeFromCart(cartItem: CartItem){
      this.cartServise.removeFromCart(cartItem.food.id);
    }

    changeQuantity(cartItem: CartItem, quantityInString: string){
      const quantity = parseInt(quantityInString);
      this.cartServise.changeQuantity(cartItem.food.id, quantity); 
    }
}
