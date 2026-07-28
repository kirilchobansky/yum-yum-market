import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { CommentsComponent } from './comments/comments.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodRoutingModule } from './food-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DetailsComponent,
    CommentsComponent,
  ],
  exports: [
    DashboardComponent,
    DetailsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FoodRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class FoodModule { }
