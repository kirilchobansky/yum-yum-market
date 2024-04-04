import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/core/models';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../account/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private foodsServices: FoodService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let foodObservable: Observable<Food[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params['search']) {
        foodObservable = this.foodsServices.getFoodBySearch(params['search']);
      } else if (params['tag']) {
        foodObservable = this.foodsServices.getAllFoodsByTag(params['tag']);
      } else {
        foodObservable = this.foodsServices.getAll();
      }

      foodObservable.subscribe((foods) => {
        this.foods = foods;
      });
    });
  }
}
