export class FoodCategory{


  id!: number;
  nameCategory!: string;
  imageCategory!: string;


  constructor(id: number, nameCategory: string, imageCategory: string) {
    this.id = id;
    this.nameCategory = nameCategory;
    this.imageCategory = imageCategory;
  }
}
