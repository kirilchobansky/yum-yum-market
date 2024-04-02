import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/modules/account/services/cart.service';
import { User } from '../models';
import { logoImageUrl } from '../constans/images/logo';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    price: number = 0;
    user!: User;
    logoImageUrl = logoImageUrl;
    isAdmin: boolean = false;

    constructor(
      private cartService: CartService,
      private authService: AuthService,
      private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
      this.cartService.getCartObservable().subscribe(cart => {
        this.price = cart.totalPrice;
      })

      this.authService.userObservable.subscribe((user) => {     
        this.user = user;
        this.isAdmin = this.user.isAdmin;
        this.cdr.detectChanges();
      });
    }

    logout(){
      this.authService.logout();
    }

    get isAuth(){
      return this.user.token;
    }
}
