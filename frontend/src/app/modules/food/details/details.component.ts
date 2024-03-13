import { Component } from '@angular/core';
import { FoodService } from '../food.service';
import { Food } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../account/cart/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

    food!: Food;
    constructor(
      activatedRoute:ActivatedRoute, 
      foodService: FoodService, 
      private cartService: CartService,
      private router: Router
      ){

      activatedRoute.params.subscribe(params => {
        if(params['id']){
          this.food = foodService.getFoodById(params['id']);
        }
      })
    }

    addToCart() {
      this.cartService.addToCart(this.food);
      this.router.navigate(['/cart-page']);
    }

}
