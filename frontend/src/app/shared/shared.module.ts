import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './title/title.component';



@NgModule({
  declarations: [
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    TitleComponent
  ],
  exports: [
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
