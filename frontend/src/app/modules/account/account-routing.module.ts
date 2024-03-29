import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { PaymentComponent } from './payment/payment.component';
import { OrderTrackComponent } from './order-track/order-track.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  {path: 'cart-page', component: CartComponent},
  {path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'track/:orderId', component: OrderTrackComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
