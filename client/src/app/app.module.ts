import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegistrationComponent} from './regisrtation/registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptor} from './shared/token.interceptor';
import { OverviewComponent } from './overview/overview.component';
import { AnaliticsComponent } from './analitics/analitics.component';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegistrationComponent,
    OverviewComponent,
    AnaliticsComponent,
    HistoryComponent,
    OrderComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
