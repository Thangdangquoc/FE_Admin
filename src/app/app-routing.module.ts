import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/home/admin.component";
import {CustomerComponent} from "./admin/customer/customer.component";
import {MerchantComponent} from "./admin/merchant/merchant.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterMerchantComponent} from "./auth/register-merchant/register-merchant.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
  path: 'register',
  component: RegisterMerchantComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'merchant',
    component: MerchantComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
