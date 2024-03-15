import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputValidationsComponent } from './partials/input-validations/input-validations.component';
import { InputContainerComponent } from './partials/input-container/input-container.component';
import { TextInputComponent } from './partials/text-input/text-input.component';
import { DefaultButtonComponent } from './partials/default-button/default-button.component';


@NgModule({
  declarations: [
    LoginComponent,
    InputValidationsComponent,
    InputContainerComponent,
    TextInputComponent,
    DefaultButtonComponent
  ],
  exports: [
    LoginComponent,
    InputContainerComponent,
    InputValidationsComponent,
    TextInputComponent,
    DefaultButtonComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
