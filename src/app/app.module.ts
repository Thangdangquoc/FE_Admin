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


@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        MerchantComponent,
        CustomerComponent,
        LoginComponent,
        RegisterMerchantComponent
    ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    // AngularFireStorageModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    // RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
enableProdMode()
