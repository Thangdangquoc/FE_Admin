import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
   listOrder!: Order[];
   id: any
   status: string = "done";
  constructor(private orderService: OrderService) {
    this.id = localStorage.getItem("currentId")
  }

  ngOnInit(): void {
     this.getOrderByMerchantId(this.id)
  }
  getOrderByMerchantId(id:any){
    id = this.id
    this.orderService.findOrdersByMerchantId(id).subscribe(data =>{
      this.listOrder = data
      console.log(this.listOrder)
    })
  }
  acceptOrder(id: any) {
    this.orderService.acceptOrder(id).subscribe(data => {
      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }
  deleteOrder(id: number){
     this.orderService.delete(id).subscribe(data =>{
       this.ngOnInit()
     })

  }
}
