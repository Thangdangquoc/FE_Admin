import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/home/admin.component";
import {CustomerComponent} from "./admin/customer/customer.component";
import {MerchantComponent} from "./admin/merchant/merchant.component";

const routes: Routes = [{
  path: '',
  component: AdminComponent
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
