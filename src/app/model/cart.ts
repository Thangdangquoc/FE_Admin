import {Customer} from "./customer";

export class Cart{
  id: number;
  customer: Customer;


  constructor(id: number, customer: Customer) {
    this.id = id;
    this.customer = customer;
  }
}
