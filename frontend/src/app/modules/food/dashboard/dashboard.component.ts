import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  foods: Food[] = [];

  constructor(private foodServices: FoodService, activatedRoute: ActivatedRoute){
      activatedRoute.params.subscribe((params) => {
        if(params['search']){
          this.foods = this.foodServices.getFoodBySearch(params['search']);
        }else if(params['tag']){
          this.foods = this.foodServices.getAllFoodsByTag(params['tag']);
        }else this.foods = this.foodServices.getAll();
      })
      
  }
}
