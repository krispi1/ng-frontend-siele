import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsInDepartmentComponent } from './components/products-in-department/products-in-department.component';
import { ProductsInCategoryComponent } from './components/products-in-category/products-in-category.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomersAddressComponent } from './components/customers-address/customers-address.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id/details', component: ProductDetailComponent },
  { path: 'products/indepartment/:id', component: ProductsInDepartmentComponent },
  { path: 'products/inCategory/:id', component: ProductsInCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customers/address', component: CustomersAddressComponent},
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard] // protect cart route
  },
  { path: 'search', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };
export const routingComponents =
  [
    ProductsComponent,
    PageNotFoundComponent,
    ProductsInDepartmentComponent,
    ProductsInCategoryComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    CustomersAddressComponent,
    SearchComponent,
    CartComponent
  ];

/** routingComponents array
 *
 * "export const routingComponents" enables importing
 * a SINGLE array with all routing components in AppModule
 *
 **/
