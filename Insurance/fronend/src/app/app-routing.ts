import { AddUserComponent } from './users/add-user.component';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { UsersModule } from './users/users.module';
import { ProtectGuard } from './protect.guard';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer.component';
import { HomeComponent } from './home.component';
import { EditUserComponent } from './users/edit-user.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';



const routes: Routes = [
  {path:'', component: OfferComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'users',component:UsersModule},
  {path:'sinup',component:AddUserComponent},
  {path:'users/edit',component:EditUserComponent},
  {path:'cars', loadChildren:()=>import('./cars/cars.module').then(module=>module.CarsModule), canActivate:[ProtectGuard]},
  {path:'policies', loadChildren:()=>import('./policies/policies.module').then(module=>module.PoliciesModule)},
  {path:'**', component:PageNotFoundComponentComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})


export class AppRoutingModule{}






