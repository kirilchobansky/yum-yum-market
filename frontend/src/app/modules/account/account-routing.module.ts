import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: 'cart-page', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
