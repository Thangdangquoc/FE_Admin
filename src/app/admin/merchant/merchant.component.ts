import { Component, OnInit } from '@angular/core';
import {Merchant} from "../../model/merchant";
import {Customer} from "../../model/customer";
import {AdminService} from "../../service/admin.service";
import {Router} from "@angular/router";
import {Food} from "../../model/food";
import {MerchantService} from "../../service/merchant.service";
import {FormControl, FormGroup} from "@angular/forms";

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
  listFoodBylikeName!: Food[];
  merchantDetailForm!: FormGroup;
  avatar!: string;
  imageBanner!: string;
  phone!: string
  constructor(private adminService: AdminService,
              private router: Router,
              private merchantService: MerchantService) {
  }

  ngOnInit(): void {
    this.showActiveMerchant()
    // this.getWaitingAcceptMerchant()

    this.merchantDetailForm = new FormGroup({
      name: new FormControl(),
      phoneNumber: new FormControl(),
      address: new FormControl(),
      avatar: new FormControl(),
      imageBanner: new FormControl()
    })

  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
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
  findMerchantByPhone(phone : string){
    this.phone = phone
    console.log(this.phone)
    if (phone != null){
      this.adminService.findMerchantByPhoneNumber(phone).subscribe(data =>{
        this.merchants = data
        console.log(this.merchants)
      })

    }if(phone == "") {
      this.showActiveMerchant()
    }
  }
  detailMerchant(id: number){
    this.adminService.findMerchantById(id).subscribe(data =>{
      console.log(data)
      this.avatar = data.avatar;
      this.imageBanner = data.imageBanner
      this.merchantDetailForm = new FormGroup({
        name: new FormControl(data.name),
        phoneNumber: new FormControl(data.phoneNumber),
        address: new FormControl(data.address),
        avatar: new FormControl(data.avatar),
        imageBanner: new FormControl(data.imageBanner)
      })
    })

  }

}

