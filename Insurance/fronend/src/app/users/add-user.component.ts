import { Component } from '@angular/core';
import IUser from './user-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  template: `
  <mat-card>
      <mat-card-title>SingUp</mat-card-title>
      <mat-card-content>
      <form [formGroup]="userForm" (ngSubmit)="addUser()">
      <p>
        <label>
        <mat-form-field>
          <input type="text" matInput placeholder="fullname" formControlName="fullname">
          <mat-error *ngIf="checkError('fullname', 'required')">fullname is required</mat-error>
        </mat-form-field>
        </label>
        <label>
        <mat-form-field>
          <input type="text" matInput placeholder="username" formControlName="username">
          <mat-error *ngIf="checkError('username', 'required')">username is required</mat-error>
          <mat-error *ngIf="checkError('username', 'minlength')">username should be more than 4 characters</mat-error>
        </mat-form-field>
        </label>
      </p>
      
      <p>
      <label>
      <mat-form-field>
          <input  type="password" matInput  placeholder="password" formControlName="password">
          <mat-error *ngIf="checkError('password', 'required')">password is required</mat-error>
          <mat-error *ngIf="checkError('password', 'minlength')">password should be more than 4 characters</mat-error>
          <mat-error *ngIf="checkError('password', 'maxlength')">password should be less than 8 characters</mat-error>
        </mat-form-field>
      </label>
      <label>
        <mat-form-field>
        <mat-label>Select gender</mat-label>
          <mat-select placeholder="gender" formControlName="gender">
              <mat-option *ngFor="let g of gender" [value]="g">
                {{ g }}
              </mat-option>
          </mat-select>
          <mat-error *ngIf="checkError('gender', 'required')">gender is required</mat-error>
        </mat-form-field>
      </label>
      </p>
      <p>
        <label>
        <mat-form-field>
          <input type="number" matInput placeholder="age" formControlName="age">
          <mat-error *ngIf="checkError('age', 'required')">age is required</mat-error>
          <mat-error *ngIf="checkError('age', 'min')">age should be more than 17 </mat-error>
          <mat-error *ngIf="checkError('age', 'max')">age should be less than 63 </mat-error>          
        </mat-form-field>
        </label>
        <label>
        <mat-form-field>
          <input type="text" matInput placeholder="city" formControlName="city">
          <mat-error *ngIf="checkError('city', 'required')">city is required</mat-error>
        </mat-form-field>
        </label>
      </p>
      <p>
        <label>
        <mat-form-field>
          <input type="text" matInput placeholder="state" formControlName="state">
          <mat-error *ngIf="checkError('state', 'required')">state is required</mat-error>
        </mat-form-field>
        </label>
        <label>
        <mat-form-field>
          <input type="text" matInput placeholder="street" formControlName="street">
          <mat-error *ngIf="checkError('street', 'required')">street is required</mat-error>
        </mat-form-field>
        </label>
      </p>
    
      <p>
        <label>
        <mat-form-field>
          <input type="text" matInput placeholder="zipcode" formControlName="zipcode">
          <mat-error *ngIf="checkError('zipcode', 'required')">zipcode is required</mat-error>
          <mat-error *ngIf="checkError('zipcode', 'minlength')">zipcode should be 5 characters</mat-error>
          <mat-error *ngIf="checkError('zipcode', 'maxlength')">zipcode should be 5 characters</mat-error>
        </mat-form-field>
        </label>
      </p>
      <div class="button">
        <button type="submit" mat-button mat-raised-button color="primary" [disabled]="!userForm.valid">Save</button>
        <a routerLink="cars" mat-button color="primary" (click)="cancel()">Cancel</a>
      </div>
      <div class="text-center login">
              Already have an account ? 
              <a routerLink="/login" (click)="login()">Login</a> hera.
        </div>
      </form>
      </mat-card-content>
      </mat-card>
      `,
      styles: [
      `
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
      
      mat-card-title,
      mat-card-content {
      display: flex;
      justify-content: center;
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
      `,
      ],
    })
export class AddUserComponent{

  gender:string[]=[];
  userForm!: FormGroup;
  user!:IUser;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) {
    this.userForm=this.formBuilder.group({
      fullname:['', [Validators.required, Validators.minLength(4)]],
      username:['', [Validators.required, Validators.minLength(4)]],
      password:['',  [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      age:['',[Validators.required, Validators.min(18), Validators.max(62)]],
      gender:['', Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipcode:['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      street:['',Validators.required]

    });
    this.gender=this.userService.gender;
   }
  
  addUser(){
    const newUser = {
      "fullname":this.userForm.value.fullname,
      "username":this.userForm.value.username,
      "password":this.userForm.value.password,
      "age":this.userForm.value.age,
      "gender":this.userForm.value.gender,
      "address":{
        "city":this.userForm.value.city,
        "state":this.userForm.value.state,
        "zipcode":this.userForm.value.zipcode,
        "street":this.userForm.value.street
      }
  };

  this.userService.addUser(newUser).subscribe((response)=>{
    this.user= response.data;
  });
  this.router.navigate(['']);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  login(){
    this.router.navigate(['/login']);
  }

  cancel(){
    this.router.navigate(['']);
  }

}
