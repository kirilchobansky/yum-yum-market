import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { DefaultButtonComponent } from './form-elements/default-button/default-button.component';
import { InputContainerComponent } from './form-elements/input-container/input-container.component';
import { InputValidationsComponent } from './form-elements/input-validations/input-validations.component';
import { TextInputComponent } from './form-elements/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    TitleComponent,
    DefaultButtonComponent,
    InputContainerComponent,
    InputValidationsComponent,
    TextInputComponent
  ],
  exports: [
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    TitleComponent,
    DefaultButtonComponent,
    InputContainerComponent,
    InputValidationsComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
