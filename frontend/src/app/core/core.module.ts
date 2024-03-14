import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NotFoundPageComponent
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
