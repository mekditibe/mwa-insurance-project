import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPolicyComponent } from './view-policy.component';
import { ListPolicyComponent } from './list-policy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from '../add-token.interceptor';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ProtectGuard } from '../protect.guard';



@NgModule({
  declarations: [
    ViewPolicyComponent,
    ListPolicyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    RouterModule.forChild([
      {path:'' , component:ListPolicyComponent, pathMatch:'full'},
      {path:'view/:car_Id', component:ViewPolicyComponent, canActivate:[ProtectGuard]}

    ])
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddTokenInterceptor,
        multi: true
      }
  ]
})
export class PoliciesModule { }
