import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    StarRatingComponent,
    SearchComponent
  ],
  exports: [
    StarRatingComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
