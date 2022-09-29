import { Component, OnInit } from '@angular/core';
import IState from '../state-interface';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-sidenav',
  template: `
      <mat-nav-list>
        <div class="logo py-4">
          <!-- <img src="https://www.statefarm.com/content/dam/sf-library/en-us/secure/legacy/state-farm/Mya_ViewPolicyAndIDCards.svg"/> --> 
        </div>
        <mat-divider></mat-divider>
        <h2 matSubheader class="mt-2" style="color:black; font-size:22px">MWA Insurance</h2>
        <a mat-list-item routerLink="/home" routerLinkActive="list-item-active" > <mat-icon>dashboard</mat-icon> Dashboard </a>
        <a mat-list-item routerLink="/cars" routerLinkActive="list-item-active"> <mat-icon>directions_car</mat-icon> Car </a>
        <a mat-list-item routerLink="/policies" routerLinkActive="list-item-active"> <mat-icon>ac_unit</mat-icon> Policies </a>
        <a *ngIf="app_state.token" mat-list-item routerLink="/users/edit" routerLinkActive="list-item-active"> <mat-icon>edit</mat-icon>Edit Profile</a>


      </mat-nav-list>
  `,
  styles: [`


  .logo{
    text-align: center;
    padding: 2.5rem 1rem;
    img{
      width: 2px;
      height: 2px;
    }
  }

  .mat-icon{
    vertical-align: center;
    margin-right: 1rem;
  }

  .mat-divider{
    border-top-width: 2px;
    border-color: white;

  }

  .mat-list-item{
    color: black;
    font-size: 1.1rem;
    height: 44px !important;
    margin-bottom:4px;
   
    ::ng-deep{
        .mat-list-item-content{
          border-radius:5px;
          margin: 0 8px;
          &:hover{
            background-color:#2c3344 !important;;  
          }
        }
    }
  }

  .list-item-active{
    color: #f2f5f7;
    ::ng-deep{
      .mat-list-item-content{
        background-color: #2c3344 !important;
        &:hover{
            background-color: #2c3344 !important;
          }
      }
    }
  }

  mat-subheader{
      color: black;
      /* #818cf8; */
      font-size: 0.2rem;
      font-weight: 100;
      letter-spacing: 1px;
  }

  `
  ]
})
export class SidenavComponent implements OnInit {

  app_state:IState={
    _id:'',
    fullname:'',
    username:'',
    token:''
  }
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.state.subscribe((state:IState)=>{
      this.app_state=state;
    });
  }

}
