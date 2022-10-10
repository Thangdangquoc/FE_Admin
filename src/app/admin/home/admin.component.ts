import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {Merchant} from "../../model/merchant";
import {Customer} from "../../model/customer";
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  p: any;
  merchants !: Merchant[];
  merchant !: Merchant;
  merchantsAccept!: Merchant[];
  customers!: Customer[];
  customersAccept!: Customer[];
  i = 0
  admin!: string;
  countCustomer: any;
  countMerchant: any;
  constructor(private adminService: AdminService,
              private router: Router) {
   // @ts-ignore
    this.admin = localStorage.getItem("admin");
  }

  ngOnInit() {
      this.showActiveMerchant()
      this.getWaitingAcceptMerchant()
      this.showActiveCustomer()
      this.getWaitingAcceptCustomer()
// this.count()
  }
  showActiveMerchant() {
    this.adminService.showActiveMerchant().subscribe(data => {
      this.merchants = data
      console.log(data)
      this.countMerchant = data.length;
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
      this.countCustomer = customer.length;
    })
  }
  getWaitingAcceptCustomer(){
    this.adminService.showListRequestCustomer().subscribe(customerA => {
      this.customersAccept = customerA
      console.log(customerA)
    })
  }
  acceptCustomer(id: any) {
    this.adminService.acceptCustomer(id).subscribe(data => {
      this.getWaitingAcceptCustomer()
      this.showActiveCustomer()
    }, error => {
      console.log(error)
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
  findMerchantByPhone(phone : string){
    this.adminService.findMerchantByPhoneNumber(phone).subscribe(data =>{
      this.merchants = data
      console.log(this.merchants)
    })
  }
}
