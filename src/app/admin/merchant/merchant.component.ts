import { Component, OnInit } from '@angular/core';
import {Merchant} from "../../model/merchant";
import {Customer} from "../../model/customer";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {
  p: any;
  merchants !: Merchant[];
  merchantsAccept!: Merchant[];
  customers!: Customer[];
  customersAccept!: Customer[];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.showActiveMerchant()
    this.getWaitingAcceptMerchant()
  }

  showActiveMerchant() {
    this.adminService.showActiveMerchant().subscribe(data => {
      this.merchants = data
      console.log(data)
    })

  }

  controlMerchant(id: number) {
    this.adminService.controlMerchant(id).subscribe(data => {
      this.ngOnInit()

    }, e => console.log(e));
  }

  getWaitingAcceptMerchant() {
    this.adminService.showListRequestMerchant().subscribe(merchant => {
      this.merchantsAccept = merchant
    })
  }

  acceptMerchant(id: any) {
    this.adminService.acceptMerchant(id).subscribe(data => {
      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }
}

