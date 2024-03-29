import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/core/models/Order';
import { ORDERS_CREATE_URL, ORDERS_GET_BY_ID_URL, ORDERS_NEW_CURRENT_USER_URL, ORDERS_PAY_URL } from 'src/app/core/constans/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

   createOrder(order: Order){
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  };

  getNewOrderForCurrentUser(): Observable<Order>{
    return this.http.get<Order>(ORDERS_NEW_CURRENT_USER_URL);
  };

  pay(order: Order): Observable<string>{
    return this.http.post<string>(ORDERS_PAY_URL, order);
  };

  getOrderById(orderId: string): Observable<Order>{
    return this.http.get<Order>(ORDERS_GET_BY_ID_URL + orderId);
  }
}
