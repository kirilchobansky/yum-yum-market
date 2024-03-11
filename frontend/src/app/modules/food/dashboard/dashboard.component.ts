import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  foods: Food[] = [];

  constructor(private foodServices: FoodService){
      this.foods = this.foodServices.getAll();
  }
}
