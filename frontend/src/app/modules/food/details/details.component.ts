import { Component, OnInit, inject } from '@angular/core';
import { FoodService } from '../food.service';
import { Food } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../account/services/cart.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: false,
})
export class DetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  food!: Food;
  userId = '';
  returnUrl = '';
  isLiked: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.foodService.getFoodById(params['id']).subscribe((food) => {
          this.food = food;
          this.getUser();
        });
      }
      this.getUserData();
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  getUserData(): void {
    const userJson = localStorage.getItem('User');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userId = user.id;
    }
  }

  getUser() {
    if (this.userId) {
      this.authService.getUser(this.userId).subscribe((user) => {
        this.isLiked = user.favoriteFoods.includes(this.food.id);
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigate(['/cart-page']);
  }

  likeFood() {
    this.foodService.likeFood(this.food.id, this.userId).subscribe(() => {
      this.router.navigate([this.returnUrl]);
    });
  }

  dislikeFood() {
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
