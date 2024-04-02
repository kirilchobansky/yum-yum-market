import { Component, Input } from '@angular/core';
import { Food } from 'src/app/core/models';
import { CartService } from 'src/app/modules/account/services/cart.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {

  @Input()
  foods!: Food[];

  @Input()
  gap? = '1.5rem';

  @Input()
  margin? = '2rem 3rem 0 3rem'

  constructor(private cartService: CartService){}

  addToCart(food: Food){
    this.cartService.addToCart(food);
  }
}
