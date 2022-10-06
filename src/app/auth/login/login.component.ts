import { Component, OnInit } from '@angular/core';
import {UserToken} from "../../model/user-token";
import {AppUser} from "../../model/appuser";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userToken?:UserToken;
  currentId?: number;
  user?: any;
  formLogin!: FormGroup;
  constructor(private loginService: LoginService,
              private router: Router,
              private toastr: ToastrService) { }

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
    this.toastr.success("Login Success")
    console.log(this.user);
    this.loginService.login(this.user).subscribe((data:UserToken) =>{
      alert("hello")
      this.userToken = data;
      console.log(this.userToken);
      if (this.userToken!=null){
        this.currentId = data.id;
        console.log(this.currentId);

        localStorage.setItem("currentId",String(this.currentId));
        localStorage.setItem("admin",String(this.user.username));
        if (this.userToken.roles[0].name == "ROLE_CUSTOMER" ){
          this.router.navigate(["/customer"]);
          console.log("ROLE_CUSTOMER")
        }else if (this.userToken.roles[0].name == "ROLE_ADMIN"){
          this.router.navigate(["/admin"]);
          console.log("ROLE_ADMIN")
        }else if (this.userToken.roles[0].name == "ROLE_MERCHANT"){
          this.router.navigate(["/home-merchant"]);
          console.log("ROLE_MERCHANT")
        }
      }
    })

  }
  get username() {
    return this.formLogin.get('username');
  }

  get password() {
    return this.formLogin.get('password');
  }

}
