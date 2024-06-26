import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderTrackComponent } from './order-track/order-track.component';
import { ProfileOrdersListComponent } from './profile-orders-list/profile-orders-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
    PaymentComponent,
    OrderTrackComponent,
    ProfileOrdersListComponent
  ],
  exports: [
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
    PaymentComponent,
    OrderTrackComponent,
    ProfileOrdersListComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule
  ],

})
export class AccountModule { }
