import { Component, OnInit } from '@angular/core';
import { Food } from '../models';
import { FoodService } from 'src/app/modules/food/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  foods!: Food[];
  constructor(private foodService: FoodService){}

  ngOnInit(): void {
    this.foodService.getAll().subscribe((foods) => {
      foods.sort((a: Food, b: Food) => b.ordersCount - a.ordersCount);
      this.foods = foods.slice(0, 4);
    });
  }
}
