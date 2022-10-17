import { Component, OnInit } from '@angular/core';
import {UserToken} from "../../model/user-token";
import {AppUser} from "../../model/appuser";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from 'sweetalert2'
import {MerchantService} from "../../service/merchant.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  merchant!: any;
  userToken?:UserToken;
  currentId?: number;
  user?: any;
  formLogin!: FormGroup;
  constructor(private loginService: LoginService,
              private router: Router,
              private toastr: ToastrService,
              private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl("", [Validators.required,Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  login() {
    this.user = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password,
    };
    // this.toastr.success("Login Success")
    console.log(this.user);
    this.loginService.login(this.user).subscribe((data:UserToken) =>{
      this.userToken = data;
      console.log(this.userToken);
      if (this.userToken!=null){
        this.currentId = data.id;
        console.log(this.currentId);

        localStorage.setItem("currentId",String(this.currentId));

        localStorage.setItem("admin",String(this.user.username));
        this.merchantService.detailMerchant(data.id).subscribe((data:any)=>{
          this.merchant =data;
          localStorage.setItem("avatarMerchant",this.merchant.avatar);
          localStorage.setItem("imageBanner",this.merchant.imageBanner);
          localStorage.setItem("phoneNumber",this.merchant.phoneNumber);
        })
        // localStorage.setItem("imageAvatar",String(this.user.username));
        if (this.userToken.roles[0].name == "CUSTOMER" ){
          this.loginSusess()
          this.router.navigate(["/customer"]);
          console.log("CUSTOMER")
        }else if (this.userToken.roles[0].name == "ADMIN"){
          this.loginSusess()
          this.router.navigate(["/admin"]);
          console.log("ADMIN")
        }else if (this.userToken.roles[0].name == "MERCHANT"){
          this.loginSusess()
          this.router.navigate(["/order"]);
          console.log("MERCHANT")
        }
      } else {
        this.banAcc()
      }
    })

  }
  get username() {
    return this.formLogin.get('username');
  }

  get password() {
    return this.formLogin.get('password');
  }

  loginSusess(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }
  banAcc(){
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'The account is not exist or has been locked',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
