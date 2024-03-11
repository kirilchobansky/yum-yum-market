import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';



@NgModule({
  declarations: [
    StarRatingComponent
  ],
  exports: [
    StarRatingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
