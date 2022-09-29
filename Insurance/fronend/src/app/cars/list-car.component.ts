import { Component} from '@angular/core';
import { Router } from '@angular/router';
import ICar from './car-interface';
import { CarService } from './car.service';


@Component({
  selector: 'app-list-car',
  template:`

  <mat-card>
  <mat-card-title>List Insured Vehicle</mat-card-title>
  <mat-card-content>
  <a [routerLink]="['add']" class="btn btn-sm btn-success mb-2"><mat-icon>add</mat-icon></a>
  <table class="table table-striped">
    <thead>
        <tr>
            <th style="width: 30%" scope="col">#</th>
            <th style="width: 30%" scope="col">Licence plate</th>
            <th style="width: 30%" scope="col">Vehicle identification number</th>
            <th style="width: 30%" scope="col">Manufacturing Year </th>
            <th style="width: 30%" scope="col">Driving licence </th>
            <th style="width: 30%" scope="col">Vehicle Type</th>
            <th style="width: 30%" scope="col">Price</th>
            <th style="width: 10%"></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let c of listOfCar;index as i">
            <th scope="row">{{ i + 1 }}</th>
            <td >{{ c.plate}}</td>
            <td>{{ c.vehicle_identification_number}}</td>
            <td>{{ c.year}}</td>
            <td>{{ c.driving_licence }}</td>
            <td>{{ c.type}}</td>
            <td>{{ c.price}}</td>
            <td style="white-space: nowrap">
                <button (click)="editCar(c)" [routerLink]="['edit']"  mat-icon-button color="primary" size="xs"><mat-icon>edit</mat-icon></button>
                <button (click)="deleteCar(c._id)" [routerLink]="['cars']" mat-icon-button color="warn" ><mat-icon>delete</mat-icon></button>
                <button (click)="policy(c)" [routerLink]="['policies']" mat-raised-button color="primary" >Policy</button>
            </td>
        </tr>
    </tbody>
</table>
  </mat-card-content>
</mat-card>

  `,
  styles: [`
  button, a{
    margin-right: 10px;
  }
    table {
      width: 100%;
    }
    :host {
      display: flex;
      justify-content: center;
      margin: 30px 0px;
      }

      .error {
      padding: 16px;
      width: 300px;
      color: white;
      background-color: red;
      }
      
      .button {
      display: flex;
      justify-content: flex-end;
      }
  `]
})



export class ListCarComponent{

  listOfCar:ICar[]=[];

  constructor(private cartService:CarService,private router:Router) {
    this.getCars();
  }
  getCars(){
    this.cartService.getCars().subscribe((response)=>{
      this.listOfCar=response.data;
    })
  }
  handleAddCar(): void {
    this.router.navigate(['','cars','add']);
  }
  editCar(c:ICar){
    const car_Id:string= c._id;
    this.router.navigate(['','cars','edit', car_Id]);
  }
  policy(c:ICar){
    const car_Id:string= c._id;
    this.router.navigate(['','policies','view', car_Id]);
  }

  deleteCar(c:string){
    this.cartService.deleteCar(c).subscribe((result)=>{
      console.log(result);
      this.getCars();
    });
    this.router.navigate(['','cars']);
  }
}
