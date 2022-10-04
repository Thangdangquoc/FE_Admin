import { Component, OnInit } from '@angular/core';
import {Food} from "../../model/food";
import {MerchantService} from "../../service/merchant.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   listFood!: Food[];
   id: any;
  constructor(private merchantService: MerchantService) {
    this.id = localStorage.getItem("currentId")
  }

  ngOnInit(): void {
    this.getFoodByMerchantId(this.id)
  }
 getFoodByMerchantId(id:any){
    id = this.id
    this.merchantService.getFoodByMerchantId(id).subscribe(data =>{
      this.listFood = data
      console.log(this.listFood)
    })
 }
 isEmptyFood(id:number){
    this.merchantService.controlFood(id).subscribe(data =>{
    this.ngOnInit()
    })
 }
}
