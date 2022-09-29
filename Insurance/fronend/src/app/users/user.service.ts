import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IState from '../state-interface';
import IUser from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BackEnd = 'http://127.0.0.1:3000/';
  public gender=["male","female"];


  public state:BehaviorSubject<IState> = new BehaviorSubject({
      _id:'',
      fullname:'',
      username:'',
      token: ''
    })

  constructor(private http:HttpClient) { }
//{"success":true, "data": token}

  login(obj:{username:string, password:string}){
    return this.http.post<{success:boolean, data: string}>(this.BackEnd + 'login', obj);
  }
  addUser(obj:IUser){
    return this.http.post<{success:boolean, data: IUser}>('http://127.0.0.1:3000/sinup', obj);
  }
  editUser(obj:IUser){
    return this.http.put<{success:boolean, data: string}>(this.BackEnd + 'users/',obj);
  }
  deleteUser(){
    return this.http.delete<{success:boolean, data: string}>(this.BackEnd + 'users');
  }
  getUser(){
    return this.http.get<{success:boolean, data: IUser}>(this.BackEnd + 'users');
  }
  getUsers(){
    return this.http.get<{success:boolean, data: IUser[]}>(this.BackEnd + 'users');
  }

}
