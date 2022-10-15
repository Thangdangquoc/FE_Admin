import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Bill} from "../../model/bill";
import {Router} from "@angular/router";
import {OrderDetail} from "../../model/orderdetail";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
 listBill!: Bill[];
 id: any;
 listOrderDetail!: OrderDetail[]
  count: any;
  admin!: string;
  avatarMerchant!:any
  constructor(private orderService: OrderService,
              private router: Router) {
    // @ts-ignore
    this.admin = localStorage.getItem("admin")
    this.id = localStorage.getItem("currentId")
    this.avatarMerchant = localStorage.getItem("avatarMerchant")
  }

  ngOnInit(): void {
    this.findOrderDetailByUserId();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  findOrderDetailByUserId(){
    this.orderService.findOrderDetaiByUserId(this.id).subscribe(data =>{
      this.listOrderDetail = data
      this.count = data.length;
    })
  }
  findOrderDetailByCustomerName(name: string){
    if (name != null) {
      this.orderService.findOrderDetailByCustomerName(this.id, name).subscribe(data => {
        this.listOrderDetail = data
        console.log(data)
        console.log(this.listOrderDetail)
      })
    }
    if (name == "") {
      this.findOrderDetailByUserId()
    }
  }
}
