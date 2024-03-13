import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodModule } from './food/food.module';
import { AccountModule } from './account/account.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FoodModule,
    AccountModule
  ]
})
export class ModulesModule { }
