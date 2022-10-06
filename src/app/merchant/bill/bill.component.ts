import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Bill} from "../../model/bill";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
 listBill!: Bill[];
 id: any;
  constructor(private orderService: OrderService,
              private router: Router) {
    this.id = localStorage.getItem("currentId")
  }

  ngOnInit(): void {
    this.getBillByUserId(this.id)
  }
  getBillByUserId(id:any){
    id = this.id
    this.orderService.findBillsByMerchantId(id).subscribe(data =>{
     this.listBill = data

    })
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
