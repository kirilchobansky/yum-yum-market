import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FoodRoutingModule } from './food-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DetailsComponent,
  ],
  exports: [
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FoodRoutingModule,
    SharedModule
  ]
})
export class FoodModule { }
