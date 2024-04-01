import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/modules/account/services/cart.service';
import { User } from '../models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    price: number = 0;
    user!: User;

    constructor(private cartService: CartService,
      private authService: AuthService){

      this.cartService.getCartObservable().subscribe(cart => {
        this.price = cart.totalPrice;
      })

      this.authService.userObservable.subscribe((user) => {     
        this.user = user;
      });
    }

    logout(){
      this.authService.logout();
    }

    get isAuth(){
      return this.user.token;
    }
}
