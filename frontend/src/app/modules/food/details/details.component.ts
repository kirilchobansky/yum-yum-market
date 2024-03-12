import { Component } from '@angular/core';
import { FoodService } from '../food.service';
import { Food } from 'src/app/shared/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

    food!: Food;
    constructor(activatedRoute:ActivatedRoute, foodService: FoodService){
      activatedRoute.params.subscribe(params => {
        if(params['id']){
          this.food = foodService.getFoodById(params['id']);
        }
      })
      
    }

}
