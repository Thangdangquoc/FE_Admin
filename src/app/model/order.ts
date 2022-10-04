import {Customer} from "./customer";
import {Merchant} from "./merchant";

export class Order {
  id: number;
  createAt: any;
  isAccept!: boolean;
  priceTotal: number;
  customer: Customer;
  merchant!: Merchant;
  totalCart: number;



  constructor(id: number, createAt: any, priceTotal: number, customer: Customer, merchant: Merchant, totalCart: number, isAccept: boolean) {
    this.id = id;
    this.createAt = createAt;

    this.priceTotal = priceTotal;
    this.customer = customer;
    this.merchant = merchant;
    this.totalCart = totalCart;
    this.isAccept = isAccept
  }
}
