import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  foods: Food[] = [];

  constructor(private foodServices: FoodService, activatedRoute: ActivatedRoute){
      let foodObservable: Observable<Food[]>;
      activatedRoute.params.subscribe((params) => {
        if(params['search']){
          foodObservable = this.foodServices.getFoodBySearch(params['search']);
        }else if(params['tag']){
          foodObservable = this.foodServices.getAllFoodsByTag(params['tag']);
        }else foodObservable = this.foodServices.getAll();

        foodObservable.subscribe((foods) => {
            this.foods = foods;
        })
      })
      
  }
}
