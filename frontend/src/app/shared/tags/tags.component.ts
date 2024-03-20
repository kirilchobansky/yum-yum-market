import { Component } from '@angular/core';
import { FoodService } from 'src/app/modules/food/food.service';
import { Tag } from '../../core/models';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
    tags?:Tag[];
    constructor(foodService:FoodService) {
      foodService.getAllTags().subscribe((tags) => {
        this.tags = tags;
      });
    }
}
