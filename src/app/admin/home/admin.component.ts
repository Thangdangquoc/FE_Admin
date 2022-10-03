import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {Merchant} from "../../model/merchant";
import {Customer} from "../../model/customer";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  p: any;
  merchants !: Merchant[];
  merchantsAccept!: Merchant[];
  customers!: Customer[];
  customersAccept!: Customer[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
      this.showActiveMerchant()
      this.getWaitingAcceptMerchant()
      this.showActiveCustomer()
      this.getWaitingAcceptCustomer()
  }
  showActiveMerchant() {
    this.adminService.showActiveMerchant().subscribe(data => {
      this.merchants = data
      console.log(data)
    })

  }
  controlMerchant(id: number) {
    this.adminService.controlMerchant(id).subscribe(data => {
      this.showActiveMerchant();
      // this.router.navigate(['/admin']);

    }, e => console.log(e));
  }
  getWaitingAcceptMerchant(){
    this.adminService.showListRequestMerchant().subscribe(merchant => {
      this.merchantsAccept = merchant
      console.log(merchant)
    })
  }

  acceptMerchant(id: any) {
    this.adminService.acceptMerchant(id).subscribe(data => {
      this.getWaitingAcceptMerchant()
    this.showActiveMerchant()
    }, error => {
      console.log(error)
    })
  }
  showActiveCustomer() {
    this.adminService.showCustomerList().subscribe(customer => {
      this.customers = customer
      console.log(customer)
    })
  }
  getWaitingAcceptCustomer(){
    this.adminService.showListRequestCustomer().subscribe(customerA => {
      this.customersAccept = customerA
      console.log(customerA)
    })
  }
  controlCustomer(id: number) {
    this.adminService.controlCustomer(id).subscribe(data => {
      this.showActiveCustomer();
      // this.router.navigate(['/admin']);

    }, e => console.log(e));
  }
  acceptCustomer(id: any) {
    this.adminService.acceptCustomer(id).subscribe(data => {
      this.getWaitingAcceptCustomer()
      this.showActiveCustomer()
    }, error => {
      console.log(error)
    })
  }
}
