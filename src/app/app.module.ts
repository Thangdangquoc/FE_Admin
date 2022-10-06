import {enableProdMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminComponent} from "./admin/home/admin.component";
import {HttpClientModule} from "@angular/common/http";
import {MerchantComponent} from "./admin/merchant/merchant.component";
import { CustomerComponent } from './admin/customer/customer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterMerchantComponent } from './auth/register-merchant/register-merchant.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./merchant/merchanthome/home.component";
import {BillComponent} from "./merchant/bill/bill.component";
import {OrderComponent} from "./merchant/order/order.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MerchantComponent,
    CustomerComponent,
    LoginComponent,
    RegisterMerchantComponent,
    HomeComponent,
    BillComponent,
    OrderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
enableProdMode()
