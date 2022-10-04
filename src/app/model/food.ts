
import {Merchant} from "./merchant";
import {FoodCategory} from "./foodcategory";

export class Food {
  id : number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantityStorage: number;
  sold: number;
  foodCategory!: FoodCategory;
  merchant!: Merchant;
  isEmpty!: boolean;


  constructor(id: number, name: string, image: string, description: string, price: number, quantityStorage: number, sold: number, isDelete: boolean, foodCategory: FoodCategory, merchant: Merchant,isEmpty: boolean) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.price = price;
    this.quantityStorage = quantityStorage;
    this.sold = sold;
    this.foodCategory = foodCategory;
    this.merchant = merchant;
    this.isEmpty = isEmpty
  }
}
