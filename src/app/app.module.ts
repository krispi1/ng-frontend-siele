import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';

import { CartService } from './services/cart.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    CategoriesComponent,
    FooterComponent,
    routingComponents,
  ],

  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],

  providers: [
    CartService,
    CategoriesService,
    ProductsService,
    AuthService,
    AuthGuard,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
     }
  ],

  bootstrap: [AppComponent]

}) // end @NgModule()

export class AppModule { }