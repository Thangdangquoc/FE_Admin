import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Food} from "../../model/food";
import {MerchantService} from "../../service/merchant.service";
import {Router} from "@angular/router";
import {FoodCategory} from "../../model/foodcategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {count, finalize} from "rxjs/operators";
import {OrderService} from "../../service/order.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  avatar!: string;
  imageBanner!: string;
  food!:Food;
  imgURL="";
   listFood!: Food[];
   listCategory!: FoodCategory[];
   formUpdateFood!: FormGroup;
   formCreateFood!: FormGroup;
   formDetailFood!: FormGroup;
   formDetailMerchant!: FormGroup;
   formUpdateMerchant!: FormGroup;
   formDetailOrder!: FormGroup;
  countOrder: any;

   id: any;
   foodDetailImage!: string;
   admin!: string;
  @ViewChild('closeBtn') closeBtn: ElementRef | undefined;

  @ViewChild('uploadFile',{static: true})
  public avatarDom: ElementRef | undefined;
  selectedImage: any = null;
  arrayPicture = '';
  idUpdate!: any;
  url= ""
  idC: any;
  countFood!:any;

  @ViewChild('uploadFile2',{static: true})
  public avatarDom2: ElementRef | undefined;
  selectedImage2: any = null;
  arrayPicture2 = '';
  url2= ""
  constructor(private merchantService: MerchantService,
              private router: Router,
              private storage: AngularFireStorage,
              private orderService: OrderService) {
    this.id = localStorage.getItem("currentId")
    // @ts-ignore
    this.admin = localStorage.getItem("admin")
  }

  ngOnInit(): void {
    document.getElementById("sidenav-main")!.style.display = "block"

    this.getFoodByMerchantId(this.id)
    this.getOrderByMerchantId(localStorage.getItem("currentId"))
    this.showAllCategory();
    this.formCreateFood = new FormGroup({
      name: new FormControl("", Validators.required),
      image: new FormControl(""),
      description: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      quantityStorage: new FormControl("", Validators.required),
      sold: new FormControl(0),
      merchant: new FormControl(""),
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
    this.formDetailMerchant = new FormGroup({
       name: new FormControl(),
       phoneNumber: new FormControl(),
       address: new FormControl(),
       avatar: new FormControl(),
       imageBanner: new FormControl(),
    })
    this.detailMerchant(this.id)
    this.formDetailOrder = new FormGroup({
      create_at: new FormControl,
      price_total : new FormControl,

    })
  }


 getFoodByMerchantId(id:any){
    id = this.id
    this.merchantService.getFoodByMerchantId(id).subscribe(data =>{
      this.listFood = data
      this.countFood = data.length
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].quantityStorage == 0){
      //     this.isEmptyFood(data[i].id)
      //
      //   }
      //   break;
      // }
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
    console.log(this.formCreateFood.value.foodCategory);
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
      this.createSuccess();
        console.log(data);
      this.ngOnInit();
      document.getElementById("sidenav-main")!.style.display = "block";
      document.getElementById("resetU")!.click()
      // I want to do something like $('#myModal').modal('hide'); here.

      // this.closeModal();

    })

    this.arrayPicture="";

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
              setTimeout(()=>this.url2,3000)
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
  detailMerchant(id: any){
    // id = this.id
    this.merchantService.detailMerchant(id).subscribe(data =>{
      this.avatar = data.avatar;
      this.imageBanner = data.imageBanner
      this.formDetailMerchant = new FormGroup({
        name: new FormControl(data.name),
        phoneNumber: new FormControl(data.phoneNumber),
        address: new FormControl(data.address),
        avatar: new FormControl(data.avatar),
        imageBanner: new FormControl(data.imageBanner),
      })
    })
    console.log(this.formDetailMerchant)
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
      this.updateSuccess()
      this.arrayPicture ="";

      this.ngOnInit();

      // this.closeModal();
    })
  }
updateMerchant(){
    let merchant ={
      appUser : {
      id: this.id
      },
      name: this.formDetailMerchant.value.name,
      phoneNumber: this.formDetailMerchant.value.phoneNumber,
      address: this.formDetailMerchant.value.address

    }
    this.merchantService.updateMerchant(merchant).subscribe(data =>{
      this.updateMerchantSuccess();
      this.formDetailMerchant = new FormGroup({
        name: new FormControl(data.name),
        phoneNumber: new FormControl(data.phoneNumber),
        address: new FormControl(data.address),
      });
    })
  console.log(this.formDetailMerchant)

}
  // private closeModal(): void {
  //   // @ts-ignore
  //   this.closeBtn.nativeElement.click();
  // }
  change() {
    // console.log("test")
    document.getElementById("sidenav-main")!.style.display = "none"
  }
  changeSile(){
    document.getElementById("sidenav-main")!.style.display = "block"
  }
  findFoodByLikeName(name: string){
    // @ts-ignore
    let id = parseInt(localStorage.getItem("currentId"))
    if (name != null){
      this.merchantService.findFoodByLikeName(name,id).subscribe(data=>{
        this.listFood = data
      })
    }if(name == "") {
      this.getFoodByMerchantId(id)
    }
  }
  getOrderByMerchantId(id:any){
    id = this.id
    this.orderService.findOrdersByMerchantId(id).subscribe(data =>{
      this.countOrder = data.length;
    })
  }
  clearForm(){
    document.getElementById("success")!.onreset!.arguments
  }
createSuccess(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Create Success',
    showConfirmButton: false,
    timer: 1500
  })
}
updateSuccess(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Update Success',
    showConfirmButton: false,
    timer: 1500
  })
}
updateMerchantSuccess(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Update Success',
    showConfirmButton: false,
    timer: 1500
  })
}
}
