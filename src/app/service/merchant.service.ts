import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../model/food";



@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  API = 'http://localhost:8080/api/merchant';
// id:any;
  info:any
  constructor(private httpClient: HttpClient) {
    // this.id = localStorage.getItem("currentId")
    // console.log(this.id)
  }
  //
  // getFoodByMerchantId(): Observable<Food[]>{
  //   return this.httpClient.get<Food[]>("http://localhost:8080/api/merchant/"  + this.id);

  // }
  getFoodByMerchantId(id : any): Observable<Food[]>{
    return this.httpClient.get<Food[]>("http://localhost:8080/api/merchant/"  + id);
  }
  controlFood(id: number):Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/merchant/active-ban-food/" + id, this.info)
  }
}
