import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './users/user.service';
import jwt_decode from "jwt-decode";
import IState from './state-interface';
import { Router } from '@angular/router';


@Component({
  selector: 'my-login-form',
  template: `
      <mat-card>
            <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <p>
            <mat-form-field>
              <input type="text" matInput placeholder="Username" formControlName="username">
              <mat-error *ngIf="checkError('username', 'required')">username is required</mat-error>
              <mat-error *ngIf="checkError('username', 'minlength')">username should be more than 4 characters</mat-error>
            </mat-form-field>
          </p>

          <p>
            <mat-form-field>
              <input type="password" matInput placeholder="Password" formControlName="password">
              <mat-error *ngIf="checkError('password', 'required')">password is required</mat-error>
              <mat-error *ngIf="checkError('password', 'minlength')">password should be more than 4 characters</mat-error>
              <mat-error *ngIf="checkError('password', 'maxlength')">password should be less than 8 characters</mat-error>
            </mat-form-field>
          </p>

          <p *ngIf="error" class="error">
            {{ error }}
          </p>

          <div class="button">
            <button type="submit" mat-button mat-raised-button color="primary" [disabled]="!loginForm.valid">Login</button>
          </div>
          <div> Don't have an account ?
            <a routerLink="sinup" (click)="singup()">Sign Up</a> 
            hera.
          </div>

          <div class="alert" *ngIf="show">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>Danger!</strong> Invalid username or password.
        </div>
        </form>

      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
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
export class LoginComponent{

  show=false;
  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();

  loginForm!: FormGroup;
  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) {
    this.loginForm=this.formBuilder.group({
        username:['teff@gmail.com',[Validators.required, Validators.minLength(4)]],
        password:['1234',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
   }

  login(): void {
    if (this.loginForm.valid) {
      this.submitEM.emit(this.loginForm.value);
    }
    try {
        this.userService.login(this.loginForm.value).subscribe((response)=>{
        console.log(response);
        const tokenDecode= jwt_decode(response.data) as IState
        const application_state= {
          _id:tokenDecode._id,
          fullname:tokenDecode.fullname,
          username:tokenDecode.username,
          token:response.data
        };
        this.userService.state.next(application_state);
        localStorage.setItem('APP_STATE', JSON.stringify(application_state));
        this.router.navigate(['/home']);
      });
    } catch (error) {
      this.show=true;
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  singup(){
    this.router.navigate(['sinup']);
  }

}
