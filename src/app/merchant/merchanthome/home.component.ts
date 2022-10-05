import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Food} from "../../model/food";
import {MerchantService} from "../../service/merchant.service";
import {Router} from "@angular/router";
import {FoodCategory} from "../../model/foodcategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  food!:Food;
  imgURL="";
   listFood!: Food[];
   listCategory!: FoodCategory[];
  formUpdateFood!: FormGroup;
   formCreateFood!: FormGroup;
   formDetailFood!: FormGroup;
   id: any;
   foodDetailImage!: string;
  @ViewChild('closeBtn') closeBtn: ElementRef | undefined;

  @ViewChild('uploadFile',{static: true})
  public avatarDom: ElementRef | undefined;
  selectedImage: any = null;
  arrayPicture = '';
  idUpdate!: any;
  url= ""
  idC: any;

  @ViewChild('uploadFile2',{static: true})
  public avatarDom2: ElementRef | undefined;
  selectedImage2: any = null;
  arrayPicture2 = '';
  url2= ""
  constructor(private merchantService: MerchantService,
              private router: Router,
              private storage: AngularFireStorage) {
    this.id = localStorage.getItem("currentId")
  }

  ngOnInit(): void {
    this.getFoodByMerchantId(this.id)
    this.showAllCategory();
    this.formCreateFood = new FormGroup({
      name: new FormControl("", Validators.required),
      image: new FormControl(""),
      description: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      quantityStorage: new FormControl("", Validators.required),
      sold: new FormControl(0),
      merchant: new FormControl(this.id),
      foodCategory: new FormControl("", Validators.required),
      isEmpty: new FormControl(false),

    });
    this.formDetailFood = new FormGroup({
      name: new FormControl(),
      image: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      quantityStorage: new FormControl(),
      sold: new FormControl(),
      foodCategory: new FormControl(),
    });

    this.formUpdateFood = new FormGroup({
      id: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      image: new FormControl(""),
      description: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      quantityStorage: new FormControl("", Validators.required),
      sold: new FormControl(0),
      merchant: new FormControl(this.id),
      foodCategory: new FormControl("", Validators.required),
      isEmpty: new FormControl(false),

    });


  }
 getFoodByMerchantId(id:any){
    id = this.id
    this.merchantService.getFoodByMerchantId(id).subscribe(data =>{
      this.listFood = data
      console.log(this.listFood)
    })
 }
 isEmptyFood(id:number){
    this.merchantService.controlFood(id).subscribe(data =>{
    this.ngOnInit()
    })
 }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

 showAllCategory(){
    this.merchantService.getAllCategory().subscribe(data =>{
      this.listCategory=data;
      console.log(this.listCategory);
    })
 }

  createFood() {
    let food={
    name: this.formCreateFood.value.name,
    image: this.url,
    description: this.formCreateFood.value.description,
    price: this.formCreateFood.value.price,
    quantityStorage:this.formCreateFood.value.quantityStorage,
    sold: 0,
    foodCategory:{
        id: this.formCreateFood.value.foodCategory,
    },
    merchant:{
        id: this.id
    },
    isEmpty: false
    };
    console.log(food);
    this.merchantService.createFood(food).subscribe((data) => {
        console.log(data);
      this.ngOnInit();
      // I want to do something like $('#myModal').modal('hide'); here.

      // this.closeModal();
    })


  }

  findCategoryById() {

  }


  UploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit()
  }
  private submit() {
    if (this.selectedImage != null){
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath)
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
              this.arrayPicture = url
              this.url = this.arrayPicture;
              setTimeout(()=>this.url,2000)
              // localStorage.setItem("URL", this.arrayPicture)
            }
          )
        ))
      ).subscribe()
    }
  }

  private submit2() {
    if (this.selectedImage2 != null){
      const filePath = this.selectedImage2.name;
      const fileRef = this.storage.ref(filePath)
      this.storage.upload(filePath,this.selectedImage2).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
              this.arrayPicture2 = url
              this.url2 = this.arrayPicture2;
              setTimeout(()=>this.url2,2000)
              // localStorage.setItem("URL", this.arrayPicture)
            }
          )
        ))
      ).subscribe()
    }
  }

  UploadFileImg2() {
    this.selectedImage2 = this.avatarDom2?.nativeElement.files[0];
    this.submit2();
  }
  detailFood(id: number) {
    this.merchantService.showFoodDetail(id).subscribe( data=>{
      this.foodDetailImage= data.image;
      this.formDetailFood=new FormGroup({
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        description: new FormControl(data.description),
        price: new FormControl(data.price),
        quantityStorage: new FormControl(data.quantityStorage),
        sold: new FormControl(data.sold),
        foodCategory: new FormControl(data.foodCategory.nameCategory),
      })
    })
  }

  getFoodToUpdateFood(id: number) {
    this.merchantService.showFoodDetail(id).subscribe( data=>{
      this.food = data;
      this.imgURL = data.image;
      this.arrayPicture= data.image;
      this.formUpdateFood=new FormGroup({
        id:new FormControl(data.id),
        name: new FormControl(data.name),
        image: new FormControl(data.image),
        description: new FormControl(data.description),
        price: new FormControl(data.price),
        quantityStorage: new FormControl(data.quantityStorage),
        sold: new FormControl(data.sold),
        foodCategory: new FormControl(data.foodCategory.id),
        isEmpty:  new FormControl(this.food.isEmpty)
      })
    })
  }

  updateFood(){
    if (this.url2==""){
      this.url2= this.imgURL;
    }
    console.log("anh dday"+this.url2);
    let food={
      id:this.formUpdateFood.value.id,
      name: this.formUpdateFood.value.name,
      image: this.url2,
      description: this.formUpdateFood.value.description,
      price: this.formUpdateFood.value.price,
      quantityStorage:this.formUpdateFood.value.quantityStorage,
      sold: this.formUpdateFood.value.sold,
      foodCategory:{
        id: this.formUpdateFood.value.foodCategory,
      },
      merchant:{
        id: this.id
      },
      isEmpty: this.formUpdateFood.value.isEmpty
    };
    console.log(food);
    this.merchantService.updateFood(food).subscribe((data) => {
      this.arrayPicture ="";

      this.ngOnInit();
      // this.closeModal();
    })
  }

  // private closeModal(): void {
  //   // @ts-ignore
  //   this.closeBtn.nativeElement.click();
  // }
}
