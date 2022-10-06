import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../model/food";
import {FoodCategory} from "../model/foodcategory";



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

  getAllCategory(): Observable<FoodCategory[]>{
    return this.httpClient.get<FoodCategory[]>("http://localhost:8080/api/merchant/category"  );
  }
  createFood(food: any): Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/api/merchant" , food);
  }

  showFoodDetail(id: number):Observable<any>{
    return this.httpClient.get<any>("http://localhost:8080/api/merchant/food-detail/"  + id);
  }

  updateFood(food: any): Observable<any>{
    return this.httpClient.put<any>("http://localhost:8080/api/merchant" , food);
  }
 findFoodByLikeName(name: string): Observable<Food[]>{
    return this.httpClient.get<Food[]>("http://localhost:8080/api/merchant/find-food-like-name/" + name)
 }

}
