import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Food } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../account/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    food!: Food;
    userId = '';
    returnUrl = '';
    isLiked: boolean = false; 

    constructor(
      private activatedRoute: ActivatedRoute,
      private foodService: FoodService,
      private cartService: CartService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        if (params['id']) {
          this.foodService.getFoodById(params['id']).subscribe((food) => {
            this.food = food;
          });
        }
        this.getUserData();
      });
      this.getUser();
      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    }

    getUserData(): void {
      const userJson = localStorage.getItem('User');
      if (userJson) {
        const user = JSON.parse(userJson);
        this.userId = user.id;
      }
    }

    getUser(){
      this.foodService.getUser(this.userId).subscribe((user) => {
        this.isLiked = user.favoriteFoods.includes(this.food.id);
      });
    }

    addToCart() {
      this.cartService.addToCart(this.food);
      this.router.navigate(['/cart-page']);
    }

    likeFood(){
      this.foodService.likeFood(this.food.id, this.userId).subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
    }

    dislikeFood(){
      this.foodService.dislikeFood(this.food.id, this.userId).subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
    }

    likeOrDislikeFood() {
      if (this.isLiked) {
        this.dislikeFood();
      } else {
        this.likeFood();
      }
      this.isLiked = !this.isLiked;
    }
}
