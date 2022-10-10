import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/order";
import {Bill} from "../model/bill";
import {OrderDetail} from "../model/orderdetail";


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


// tim tat ca order thuoc merchant
  findOrdersByMerchantId(idCustomer: number): Observable<Order[]>{
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
  findBillsByMerchantId(id: number): Observable<Bill[]>{
    return this.httpClient.get<Bill[]>("http://localhost:8080/api/order/find-bill-by-user-id/" + id);
  }
  findOrderByNameCustomer(id: any, name: string): Observable<Order[]>{
    return this.httpClient.get<Order[]>("http://localhost:8080/api/merchant/find-order-by-name/"+ id+"/"+name)
  }
  findOrderDetailByCustomerName(id: any, name: string): Observable<OrderDetail[]>{
    return this.httpClient.get<OrderDetail[]>("http://localhost:8080/api/merchant/find-order-detail-by-name-customer/"+ id+"/"+name)
  }
  findOrderDetaiByUserId(id: any): Observable<OrderDetail[]>{
    return this.httpClient.get<OrderDetail[]>("http://localhost:8080/api/merchant/find-order-detail-by-user-id/" + id)
  }
}
