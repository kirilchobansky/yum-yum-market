import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/modules/account/services/cart.service';
import { User } from '../models';
import { logoImageUrl } from '../constants/images/logo';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit{

    price: number = 0;
    user!: User;
    logoImageUrl = logoImageUrl;
    isAdmin: boolean = false;
    isMenuOpen: boolean = false;

    constructor(
      @Inject(CartService) private cartService: CartService,
      @Inject(AuthService) private authService: AuthService,
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

    toggleMenu(){
      this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(){
      this.isMenuOpen = false;
    }

    get isAuth(){
      return this.user.token;
    }
}
