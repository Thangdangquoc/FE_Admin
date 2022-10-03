import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API = 'http://localhost:8080/api/admin';
  info: any;
  nameMerchant!: string;
  constructor(private httpClient: HttpClient) { }
  // show list merchant doi accept tai khoan
  showListRequestMerchant(): Observable<any>{
    return this.httpClient.get(this.API+`/accept-merchant`)
  }
// chap nhan tai khoan merchant
  acceptMerchant(id: number){
    return this.httpClient.post(this.API+`/accept-merchant/${id}`, this.info);
  }
// show list tai khoan merchant da duoc chap nhan
  showActiveMerchant(): Observable<any>{
    return this.httpClient.get(this.API+`/showMerchant`)
  }

  showDetailMerchant(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API + `/seller/${id}`)
  }
// ban va active tai khoan cua merchant
  controlMerchant(id: number):Observable<any> {
    return this.httpClient.post(this.API + `/active-ban-merchant/${id}`, this.info)
  }

// Quản lý Customer

  //show list customer dang doi accept
  showListRequestCustomer(): Observable<any>{
    return this.httpClient.get(this.API+`/accept-customer-list`)
  }
  // show list customer dduoc accept
  showCustomerList(): Observable<any>{
    return this.httpClient.get(this.API + '/showCustomers');
  }
// ban and active customer
  controlCustomer(id: number):Observable<any> {
    return this.httpClient.post(this.API + `/active-ban-customer/${id}`, this.info)
  }
  // chap nhan tai khoan customer
  acceptCustomer(id: number) {
    return this.httpClient.post(this.API + `/accept-customer/${id}`, this.info);
  }

  showCustomerDetail(id: number): Observable<any>{
    return this.httpClient.get<any>(this.API + `/customer/${id}`)
  }
}
