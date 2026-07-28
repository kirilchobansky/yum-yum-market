import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/models/Order';
import { CartService } from '../services/cart.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    standalone: false
})
export class CheckoutComponent implements OnInit{

    private formBuilder = inject(FormBuilder);
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private orderService = inject(OrderService);
    private router = inject(Router);
    private toastrService = inject(ToastrService);

    order: Order = new Order();
    checkoutForm!: FormGroup;

    ngOnInit(): void {
      const cart = this.cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
      let { name, address } = this.authService.currentUser;
      this.checkoutForm = this.formBuilder.group({
        name:[name, Validators.required],
        address:[address, Validators.required]
      });
    }

    get fc(){
      return this.checkoutForm.controls;
    }

    submit(){
      if(this.checkoutForm.invalid){
        this.toastrService.warning('Please fill the inputs', 'Invalid inputs')
        return;
      }

      if(!this.order.addressLatLng){
        this.toastrService.warning('Please select your location on the map', 'Location')
        return;
      }

      this.order.name = this.fc.name.value;
      this.order.address = this.fc.address.value;

      this.orderService.createOrder(this.order).subscribe({
        next: (order) => {
          this.cartService.clearCart();
          this.router.navigate(['/payment', order.id])
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error Occurs');
        }
      })
    }
}
