import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: 'users/login', component: LoginComponent, canActivate: [GuestGuard]},
  { path: 'users/register', component: RegisterComponent, canActivate: [GuestGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
