import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPolicy from './policy-interface';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  BackEnd = 'http://127.0.0.1:3000/';

  constructor(private http:HttpClient) { }
  deletePolicy(car_Id:string){
    return this.http.delete<{success:boolean, data: string}>(this.BackEnd + '/'+ car_Id);
  }
  getPolicy(car_Id:string){
    return this.http.get<{success:boolean, data: IPolicy}>(this.BackEnd + 'policies/' + car_Id);
  }
  getPolicies(){
    return this.http.get<{success:boolean, data:IPolicy[]}>(this.BackEnd + 'policies');
  }
}
