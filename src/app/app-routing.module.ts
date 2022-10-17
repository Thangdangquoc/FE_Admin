import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/home/admin.component";
import {CustomerComponent} from "./admin/customer/customer.component";
import {MerchantComponent} from "./admin/merchant/merchant.component";
import {RegisterMerchantComponent} from "./auth/register-merchant/register-merchant.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./merchant/merchanthome/home.component";
import {BillComponent} from "./merchant/bill/bill.component";
import {OrderComponent} from "./merchant/order/order.component";
import {ProfileComponent} from "./merchant/profile/profile.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterMerchantComponent
  },
  {
  path: 'admin',
  component: AdminComponent
},
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'merchant',
    component: MerchantComponent
  },
  {
    path: 'home-merchant',
    component: HomeComponent
  },
  {
    path:'bill',
    component: BillComponent
  },
  {
    path:'order',
    component: OrderComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
