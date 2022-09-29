import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { Router } from '@angular/router';
import IState from '../state-interface';

@Component({
  selector: 'app-header',
  template: `
   <mat-toolbar>
    <mat-toolbar-row class="justify-content-between">
      <button mat-icon-button></button>
      <div class="row mr-2 ml-auto">
            <button mat-button [matMenuTriggerFor]= "menu"
                class="user mt-2 d-flex align-items-center" >
              <img src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/6222481c0ad8761618b18e7e_profile-picture.jpg" class="user-image mr-1 p-2"/>
                <label *ngIf="app_state.token">{{app_state.fullname}}</label>
              <mat-icon class="user-image-icon ml-1">keyboard_arrow_down</mat-icon>
          
            </button>
            <mat-menu #menu="matMenu">
              <button routerLink="/home" mat-menu-item *ngIf="app_state.token" (click)="logout()">
                <mat-icon>exit_to_app</mat-icon>
                Logout
              </button>
              <button routerLink="/login" mat-menu-item *ngIf="!app_state.token" (click)="login()">
                <mat-icon>login</mat-icon>
                Login
              </button>
            </mat-menu>
      </div>

    </mat-toolbar-row>
   </mat-toolbar>
  `,
  styles: [`
  mat-toolbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: border-box;
    /* background: #f7f7f7; */
  }
  ul{
    li{
      list-style:none;
    }
  }

  button{
    border:0;
    outline:none;
    background:transparent;
  }

  .user{
    font-size:14px;
  }

  .user-image{
    border-radius:50%;
    width:50px;
    height:50px;
  }

  .user-image-icon{
    height:18px;
    font-size:16px;
  }

  ::ng-deep{
    .mat-menu-content{
      width:160px;
    }
  }
  
  `
  ]
})
export class HeaderComponent implements OnInit {

  app_state:IState={
    _id:'',
    fullname:'',
    username:'',
    token:''
  }
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.state.subscribe((state:IState)=>{
      this.app_state=state;

    });

  }

  login(){
    this.router.navigate(['login'])

  }


  logout(){
    this.userService.state.next({
        _id:'',
      fullname:'',
      username:'',
      token:''
    });
    localStorage.clear();
    this.router.navigate([''])
  }

}
