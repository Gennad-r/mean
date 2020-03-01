import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {RegistrationComponent} from './regisrtation/registration.component';
import {AuthGuard} from './shared/auth.guard';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {OverviewComponent} from './overview/overview.component';
import {HistoryComponent} from './history/history.component';
import {AnaliticsComponent} from './analitics/analitics.component';
import {OrderComponent} from './order/order.component';
import {ProductsComponent} from './products/products.component';


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegistrationComponent}
    ]
  },
  {
    path: '', canActivate: [AuthGuard], component: SiteLayoutComponent, children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'analytics', component: AnaliticsComponent},
      {path: 'order', component: OrderComponent},
      {path: 'products', component: ProductsComponent}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
