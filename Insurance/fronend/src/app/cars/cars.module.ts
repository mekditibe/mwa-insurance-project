import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCarComponent } from './edit-car.component';
import { AddCarComponent } from './add-car.component';
import { ListCarComponent } from './list-car.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from '../add-token.interceptor';
import { CarDirective } from './car.directive';
import { OfferComponent } from '../offer.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { ProtectGuard } from '../protect.guard';





@NgModule({
  declarations: [
    EditCarComponent,
    AddCarComponent,
    ListCarComponent,
    CarDirective,
    OfferComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    RouterModule.forChild([
      {path:'' , component:ListCarComponent, pathMatch:'full'},
      {path:'add', component:AddCarComponent, canActivate:[ProtectGuard]},
      {path:'edit/:car_Id', component:EditCarComponent, canActivate:[ProtectGuard]}

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
export class CarsModule { }
