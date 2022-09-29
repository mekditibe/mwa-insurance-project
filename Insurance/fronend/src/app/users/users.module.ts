import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { EditUserComponent } from './edit-user.component';
import { ListUserComponent } from './list-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from '../add-token.interceptor';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ProtectGuard } from '../protect.guard';



@NgModule({
  declarations: [
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModuleModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'', component:EditUserComponent, pathMatch:'full'},
      {path:'list', component:ListUserComponent,canActivate:[ProtectGuard]}
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
export class UsersModule { }
