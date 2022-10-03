import { Injectable } from '@angular/core';
import {AppUser} from "../model/appuser";
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {Observable} from "rxjs/dist/types";
import {UserToken} from "../model/user-token";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}
  login(user:any ): Observable<UserToken>{
    return this.http.post<UserToken>("http://localhost:8080/api/login-register/login",user);
  }


  registerCustomer(customer: any): Observable<any>{
    // console.log("customer",customer);
    return this.http.post<any>("http://localhost:8080/api/login-register/register-customer",customer);
  }
  registerMerchant(merchant: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/login-register/register-merchant",merchant);
  }
}
