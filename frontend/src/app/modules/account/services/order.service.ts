import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/core/models/Order';
import { ORDERS_CREATE_URL, ORDERS_GET_BY_ID_URL, ORDERS_GET_PAID_BY_USER_URL, ORDERS_GET_NEW_BY_USER_URL, ORDERS_PAY_URL, ORDERS_PATCH_CANCELLED_URL, ORDERS_PATCH_SHIPPED_URL, ORDERS_PATCH_RETURNED_URL, ORDERS_GET_CANCELLED_BY_USER_URL, ORDERS_GET_SHIPPED_BY_USER_URL, ORDERS_GET_RETURNED_BY_USER_URL } from 'src/app/core/constans/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(ORDERS_CREATE_URL, order);
  };

  pay(order: Order): Observable<string>{
    return this.http.post<string>(ORDERS_PAY_URL, order);
  };

  getOrderById(orderId: string): Observable<Order>{
    return this.http.get<Order>(ORDERS_GET_BY_ID_URL + orderId);
  };

  getNewOrdersByUser(): Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_GET_NEW_BY_USER_URL);
  };

  getPaidOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_GET_PAID_BY_USER_URL);
  };

  getCancelledOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_GET_CANCELLED_BY_USER_URL);
  };
  
  getShippedOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_GET_SHIPPED_BY_USER_URL);
  };
  
  getReturnedOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_GET_RETURNED_BY_USER_URL);
  };

  cancelOrder(orderId: string){
    return this.http.patch(ORDERS_PATCH_CANCELLED_URL, { orderId });
  };

  shippedOrder(orderId: string){
    return this.http.patch(ORDERS_PATCH_SHIPPED_URL, { orderId });
  };

  returnOrder(orderId: string){
    return this.http.patch(ORDERS_PATCH_RETURNED_URL, { orderId });
  };
}
