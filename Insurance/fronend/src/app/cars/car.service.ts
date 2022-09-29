import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICar from './car-interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  BackEnd = 'http://127.0.0.1:3000/';

  // public type:IType[]=[{"_id":"1", "name":"Crossover Vehicles"},{"_id":"2", "name":"City Vehicles"},{"_id":"3", "name":"Sport Vehicles"}];
  public type=["Crossover Vehicles","City Vehicles","Sport Vehicles"];

  constructor(private http:HttpClient) { }

  addCar(obj:ICar){
    return this.http.post<{success:boolean, data: ICar}>(this.BackEnd + 'cars', obj);
  }
  editCar(car_Id:string, obj:ICar){
    return this.http.put<{success:boolean, data: string}>(this.BackEnd + 'cars/' + car_Id, obj);
  }
  deleteCar(car_Id:string){
    return this.http.delete<{success:boolean, data: string}>(this.BackEnd + 'cars/'+ car_Id);
  }
  getCar(car_Id:string){
    return this.http.get<{success:boolean, data: ICar}>(this.BackEnd + 'cars/' + car_Id);
  }
  getCars(){
    return this.http.get<{success:boolean, data:ICar[]}>(this.BackEnd + 'cars');
  }
}
