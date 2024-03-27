import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FoodRoutingModule } from './food-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { CoreModule } from 'src/app/core/core.module';
import { CommentsComponent } from './comments/comments.component';


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
