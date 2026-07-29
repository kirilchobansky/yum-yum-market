import { Component, OnInit, inject } from '@angular/core';
import { Food } from 'src/app/core/models';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { CartService } from '../../account/services/cart.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  private foodsServices = inject(FoodService);
  private activatedRoute = inject(ActivatedRoute);

  foods: Food[] = [];

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]).subscribe(([params, queryParams]) => {
      let foodObservable: Observable<Food[]>;
      if (queryParams['search']) {
        foodObservable = this.foodsServices.getFoodBySearch(
          queryParams['search'],
        );
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
