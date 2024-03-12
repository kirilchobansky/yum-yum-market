import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StarRatingComponent,
    SearchComponent,
    TagsComponent
  ],
  exports: [
    StarRatingComponent,
    SearchComponent,
    TagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
