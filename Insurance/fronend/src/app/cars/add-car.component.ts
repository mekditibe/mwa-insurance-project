import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ICar from './car-interface';
import { CarService } from './car.service';


@Component({
  selector: 'app-add-car',
  template:`

      <mat-card>
            <mat-card-title>Add Vehicle</mat-card-title>
            <mat-card-content>
            <form [formGroup]="carForm" (ngSubmit)="addCar()">
            <p>
              <label>
              <mat-form-field>
                <input type="text" matInput placeholder="licence  plate" formControlName="plate">
                <mat-error *ngIf="checkError('plate', 'required')">licence  plate is required</mat-error>
                <mat-error *ngIf="checkError('plate', 'minlength')">licence plate number should be more than 4 characters</mat-error>
              </mat-form-field>
              </label>
              <label>
              <mat-form-field>
                <input type="text" matInput placeholder="vehicle identification number" formControlName="vehicle_identification_number">
                <mat-error *ngIf="checkError('vehicle_identification_number', 'required')">vehicle identification number is required</mat-error>
                <mat-error *ngIf="checkError('vehicle_identification_number', 'minlength')">vehicle identification number should be more than 4 characters</mat-error>
              </mat-form-field>
              </label>
              <label>
              <mat-form-field>
                <input type="text" matInput placeholder="price" formControlName="price">
                <mat-error *ngIf="checkError('price', 'required')">price is required</mat-error>
              </mat-form-field>
              </label>
            </p>
            <p>
              <label>
              <mat-form-field>
                <input type="text" matInput placeholder="manufacturing year" formControlName="year">
                <mat-error *ngIf="checkError('year', 'required')">year is required</mat-error>
                <mat-error *ngIf="checkError('year', 'minlength')">year should be 4 characters</mat-error>
                <mat-error *ngIf="checkError('year', 'maxlength')">year should be 4 characters</mat-error>
                <mat-error *ngIf="checkError('year', 'min')">year of manufacturing should be at lest 1980 </mat-error>
              </mat-form-field>
              </label>
              <label>
              <mat-form-field>
                <input type="text" matInput placeholder="driving licence" formControlName="driving_licence">
                <mat-error *ngIf="checkError('driving_licence', 'required')">driving licence is required</mat-error>
                <mat-error *ngIf="checkError('driving_licence', 'minlength')">driving licence should be more than 4 characters</mat-error>
              </mat-form-field>
              </label>
              <label>
              <mat-form-field>
              <mat-label>select type vehicle</mat-label>
                <mat-select placeholder="type" formControlName="type">
                    <mat-option *ngFor="let g of types" [value]="g">
                      {{ g }}
                    </mat-option>
                </mat-select>
                <mat-error *ngIf="checkError('type', 'required')">type is required</mat-error>
              </mat-form-field>
            </label>
            </p>
            <div class="button">
            <button  type="submit" mat-button mat-raised-button color="primary" [disabled]="!carForm.valid">Save</button>
            <a routerLink="cars" mat-button color="primary" (click)="cancel()">Cancel</a>
          </div>
          </form>
            
        </mat-card-content>
    </mat-card>

  `,
  styles: [`

      label{
        margin-right:40px;
      }
      :host {
      display: flex;
      justify-content: center;
      margin: 30px 0px;
      }
      .mat-form-field {
      width: 100%;
      min-width: 300px;
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
export class AddCarComponent{
  types:string[]=[];
  carForm!: FormGroup;
  cars!:ICar;
  constructor(private formBuilder:FormBuilder, private cartService:CarService, private router:Router) {
    this.carForm=this.formBuilder.group({
      plate:['', [Validators.required, Validators.minLength(4)]],
      vehicle_identification_number:['',[Validators.required, Validators.minLength(4)]],
      year:['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1980)]],
      driving_licence:['',[Validators.required, Validators.minLength(4)]],
      type:['', Validators.required],
      price:['',Validators.required]
    });
    this.types=this.cartService.type;
  }

  addCar(): void {
      this.cartService.addCar(this.carForm.value).subscribe((response)=>{
        this.cars= response.data;
      });
      this.router.navigate(['cars']);
  }

  
  public checkError = (controlName: string, errorName: string) => {
    return this.carForm.controls[controlName].hasError(errorName);
  }

  cancel(): void{
    this.router.navigate(['cars']);
  }


}
