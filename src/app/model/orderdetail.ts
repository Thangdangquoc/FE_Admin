import {Food} from "./food";
import {Order} from "./order";

export class OrderDetail {
  id: number;
  food!: Food;
  order: Order;
  quantity: number;
  price: number;

  constructor(id: number, food: Food, order: Order, quantity: number, price: number) {
    this.id = id;
    this.food = food;
    this.order = order;
    this.quantity = quantity;
    this.price = price;
  }
}
