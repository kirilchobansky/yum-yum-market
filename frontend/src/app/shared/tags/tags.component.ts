import { Component, inject } from '@angular/core';
import { FoodService } from 'src/app/modules/food/food.service';
import { Tag } from '../../core/models';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css'],
    standalone: false
})
export class TagsComponent {
    tags?: Tag[];
    private foodService = inject(FoodService);
    constructor() {
      this.foodService.getAllTags().subscribe((tags) => {
        this.tags = tags.slice(0, 10);
      });
    }
}
