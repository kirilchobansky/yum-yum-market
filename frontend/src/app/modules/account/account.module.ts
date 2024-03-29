import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
  ],
  exports: [
    CartComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    CoreModule
  ],

})
export class AccountModule { }
