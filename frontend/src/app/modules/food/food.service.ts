import { Injectable } from '@angular/core';
import { sampleFoods } from 'src/app/data';
import { Food } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sampleFoods;
  }
}
