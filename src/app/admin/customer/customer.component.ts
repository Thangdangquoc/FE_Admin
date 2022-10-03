import { Component, OnInit } from '@angular/core';
import {Customer} from "../../model/customer";
import {AdminService} from "../../service/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  p: any;
  customers!: Customer[];
  customersAccept!: Customer[];
  constructor(private adminService: AdminService,
              private router: Router) { }

  ngOnInit(): void {
    this.showActiveCustomer()
    this.getWaitingAcceptCustomer()
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
    })
  }
  controlCustomer(id: number) {
    this.adminService.controlCustomer(id).subscribe(data => {
      this.ngOnInit()
      // this.router.navigate(['/admin']);

    }, e => console.log(e));
  }
  acceptCustomer(id: any) {
    this.adminService.acceptCustomer(id).subscribe(data => {
      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }

}
