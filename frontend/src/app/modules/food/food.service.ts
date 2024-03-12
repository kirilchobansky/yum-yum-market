import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/app/data';
import { Food, Tag } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sample_foods;
  }

  getFoodBySearch(search: string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(search.toLowerCase()));  
  }

  getAllTags(): Tag[]{
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[]{
    return tag == 'All' 
    ? this.getAll()
    : this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(id: string): Food{
      return this.getAll().find(food => food.id === id) ?? new Food();
  }
}
