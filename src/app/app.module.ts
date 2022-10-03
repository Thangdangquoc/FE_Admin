import {enableProdMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminComponent} from "./admin/home/admin.component";
import {HttpClientModule} from "@angular/common/http";
import {MerchantComponent} from "./admin/merchant/merchant.component";
import { CustomerComponent } from './admin/customer/customer.component';


@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        MerchantComponent,
        CustomerComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
enableProdMode()
