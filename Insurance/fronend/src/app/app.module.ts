import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AddTokenInterceptor } from './add-token.interceptor';
import {MatGridListModule} from '@angular/material/grid-list';
import { MaterialModuleModule } from './material-module/material-module.module';
import { AppRoutingModule } from './app-routing';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    PageNotFoundComponentComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MaterialModuleModule,
    AppRoutingModule,

    FlexLayoutModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
