import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/core/models/Order';
import { ORDERS_CREATE_URL, ORDERS_GET_BY_ID_URL, ORDERS_PAY_URL, ORDERS_PATCH_CANCELLED_URL, ORDERS_PATCH_SHIPPED_URL, ORDERS_PATCH_RETURNED_URL, ORDERS_DELETE_ONE_URL, ORDERS_PATCH_PAID_URL, OREDRS_BY_SEARCH_URL, OREDRS_GET_ALL_URL } from 'src/app/core/constans/urls';
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

  payOrderAsAdmin(orderId: string){
    return this.http.patch(ORDERS_PATCH_PAID_URL, { orderId });
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

  deleteOrder(orderId: string){
    return this.http.delete(ORDERS_DELETE_ONE_URL + orderId);
  };

  getOrdersBySearch(search: string): Observable<Order[]>{
    return this.http.get<Order[]>(OREDRS_BY_SEARCH_URL + search);
  };

  getAll(): Observable<Order[]>{
    return this.http.get<Order[]>(OREDRS_GET_ALL_URL);
  }
}
