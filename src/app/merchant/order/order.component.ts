import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";
import {Router} from "@angular/router";
import {OrderDetail} from "../../model/orderdetail";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  from!: any;
  to!: any
  listOrder!: Order[];
  orderDetails!: OrderDetail[];
  orderDetailForm!: FormGroup;
  id: any
  status: string = "done";
  countOrder: any;
  listOrderDetail!: OrderDetail[];
  subtotal = 0;
  constructor(private orderService: OrderService,
              private router: Router) {
    this.id = localStorage.getItem("currentId")
  }

  ngOnInit(): void {
    this.getOrderByMerchantId(this.id)

  }

  getOrderByMerchantId(id: any) {
    id = this.id
    this.orderService.findOrdersByMerchantId(id).subscribe(data => {
      this.listOrder = data
      this.countOrder = data.length;
      console.log(this.listOrder)
    })
  }

  acceptOrder(id: any) {
    this.orderService.acceptOrder(id).subscribe(data => {
      this.ngOnInit()
      document.getElementById("order")!.style.display = "none"
    }, error => {
      console.log(error)
    })
  }

  deleteOrder(id: number) {
    this.orderService.cancelOrder(id).subscribe(data => {
      this.ngOnInit()
    })

  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  findOrderByCustomerName(name: string) {
    if (name != null) {
      this.orderService.findOrderByNameCustomer(this.id, name).subscribe(data => {
        this.listOrder = data
      })
    }
    if (name == "") {
      this.getOrderByMerchantId(this.id)
    }
  }
  findOrderDetailByUserId(){
    this.orderService.findOrderDetaiByUserId(this.id).subscribe(data =>{
      this.listOrderDetail = data
    })
  }


  findAllOrderDetailByOrderId(id:number){
    this.change()
    this.orderService.findAllOrderDetailByOrderId(id).subscribe((data:any)=>{
      // document.getElementById("display_customer")!.style.display="none";
      // document.getElementById("accepted_table")!.style.display="none";
      // document.getElementById("waiting_order")!.style.display="none";
      // document.getElementById("order_detail")!.style.display="block";
      this.orderDetails = data;

      console.log(this.orderDetails);
    })
  }
  change() {
    // console.log("test")
    document.getElementById("sidenav-main")!.style.display = "none"
  }

  onSlice() {
    document.getElementById("sidenav-main")!.style.display = "block"
  }
  subtotalWithTime(){
    this.orderService.findOrderByDate(this.from,this.to).subscribe((data:any)=>{
      this.subtotal= data;
    })
  }
}
