import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserToken} from "../model/user-token";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  login(user: any): Observable<UserToken>{
    return this.http.post<UserToken>("http://localhost:8080/api/login-register/login",user);
  }


  registerMerchant(merchant: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/login-register/register-merchant",merchant);
  }
}
