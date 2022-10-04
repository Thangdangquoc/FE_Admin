import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Merchant} from "../model/merchant";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";
import {OrderDetail} from "../model/orderdetail";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  API = 'http://localhost:8080/api/order';
  info: any;
  constructor(private httpClient: HttpClient) { }
  // saveCart(customer: Customer): Observable<Cart>{
  //   return this.httpClient.post<Cart>("http://localhost:8080/customers/orders/save-cart",customer);
  // }
  //
  // saveCartDetai(cartDetail: CartDetail): Observable<CartDetail>{
  //   return this.httpClient.post<CartDetail>("http://localhost:8080/customers/orders/save-cartDetail",cartDetail);
  // }

  saveOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>("http://localhost:8080/customers/orders/save-order",order);
  }

  saveOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail>{
    return this.httpClient.post<OrderDetail>("http://localhost:8080/customers/orders/save-orderDetail",orderDetail);
  }

  findOrdersByCustomerId(idCustomer: number): Observable<Order[]>{
    return this.httpClient.get<Order[]>("http://localhost:8080/api/order/find-orders-by-user-id/" + idCustomer);
  }
  acceptOrder(id: number){
    return this.httpClient.post(this.API+`/accept-order/${id}`, this.info);
  }
  //
  // findOrderById(idOrder: number): Observable<Order>{
  //   return this.httpClient.post<Order>("http://localhost:8080/customers/orders/findOrderById",idOrder);
  // }
  //
  // findOrderDetailsByOrderId(idOrder: number): Observable<OrderDetail[]>{
  //   return this.httpClient.post<OrderDetail[]>("http://localhost:8080/customers/orders/findOrderDetailsByOrderId",idOrder);
  // }
  delete(id:number): Observable<Order>{
    // @ts-ignore
    return this.httpClient.delete(this.API + `/delete-order/${id}`)
  }
}
