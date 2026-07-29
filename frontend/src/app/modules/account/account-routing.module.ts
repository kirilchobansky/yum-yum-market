import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderTrackComponent } from './order-track/order-track.component';
import { ProfileOrdersListComponent } from './profile-orders-list/profile-orders-list.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {path: 'cart-page', component: CartComponent},
  {path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'payment/:orderId', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'track/:orderId', component: OrderTrackComponent, canActivate: [AuthGuard]},
  {path: 'orders/dashboard', component: ProfileOrdersListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
