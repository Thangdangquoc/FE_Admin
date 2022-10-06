import {Cart} from "./cart";
import {Food} from "./food";
import {Merchant} from "./merchant";

export class Bill{
  id: number;
  cart: Cart;
  food!: Food;
  merchant!: Merchant;
  quantity: number;
  totalPrice: number;


  constructor(id: number, cart: Cart, food: Food, merchant: Merchant, quantity: number, totalPrice: number) {
    this.id = id;
    this.cart = cart;
    this.food = food;
    this.merchant = merchant;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}
