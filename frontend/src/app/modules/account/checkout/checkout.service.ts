import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDERS_CREATE_URL } from 'src/app/core/constans/urls';
import { Cart } from 'src/app/core/models';
import { Order } from 'src/app/core/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order){
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  }
}
