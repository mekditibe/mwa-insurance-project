import { UserService } from './users/user.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import IState from './state-interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  template:`
      <mat-drawer-container>
      <mat-drawer mode="side" opened="true">
        <app-sidenav *ngIf="app_state.token"></app-sidenav>
      </mat-drawer>
      <mat-drawer-container>
        <app-header ></app-header>
        <router-outlet ></router-outlet>
      </mat-drawer-container>
    </mat-drawer-container>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  hideOpened = false;
  app_state:IState={
    _id:'',
    fullname:'',
    username:'',
    token:''
  }
  constructor(private userService:UserService, private router:Router){
    const stringify_app_states = localStorage.getItem('APP_STATE');
    if (stringify_app_states){
        const parse_app_states= JSON.parse(stringify_app_states)
        this.userService.state.next(parse_app_states);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.changeOpendBack();
  }
  ngOnInit(): void {
    this.userService.state.subscribe((state:IState)=>{
      this.app_state=state;
    });
  }
  
  changeOpendBack(){
    if(localStorage.getItem('token'))
        this.hideOpened = true;
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
