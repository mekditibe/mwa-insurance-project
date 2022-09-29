import {Component, OnInit } from '@angular/core';
import IState from './state-interface';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-home',
  template:`
  `,
  styles:[`
  `]
  
})

export class HomeComponent implements OnInit{

  app_state:IState={
    _id:'',
    fullname:'',
    username:'',
    token:''
  }

  hideOpened = true;
  constructor(private userService:UserService) { 
  }
  ngOnInit(): void {
    this.userService.state.subscribe((state:IState)=>{
      this.app_state=state;

    });

    this.changeOpendBack();
  }

  changeOpendBack(){
    if(localStorage.getItem('token'))
        this.hideOpened = true;
  }


}