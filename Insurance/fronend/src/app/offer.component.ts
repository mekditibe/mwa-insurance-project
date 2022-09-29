import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  template: `
  <div class="offer">
    <div>
    <mat-card class="example-card">
    <mat-card-header>
      <div mat-card-avatar></div>
      <mat-card-title>View policy</mat-card-title>
    </mat-card-header>
    <img mat-card-image src="https://www.statefarm.com/content/dam/sf-library/en-us/secure/legacy/state-farm/Mya_ViewPolicyAndIDCards.svg" alt="Photo of a Shiba Inu">
    <mat-card-content>
      <p>
      No more searching for paper documents. Access policy coverages and important documents. Access all in one place.       
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>
    </div>
    
  <div>
    <mat-card class="example-card">
    <mat-card-header>
      <div mat-card-avatar></div>
      <mat-card-title>Manage payments</mat-card-title>
    </mat-card-header>
    <img mat-card-image src="https://www.statefarm.com/content/dam/sf-library/en-us/secure/legacy/state-farm/Mya_ManagePayments.svg" alt="Photo of a Shiba Inu">
    <mat-card-content>
      <p>
      Your policy is in your hands. View and pay bills, set payment reminders, update payment info, contact your agent, and more.....!       
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>

  </div>
  <div>
   
    <p class="c1" style="color:black; font-size:35px; font-weight:bold;">We make it easy to manage your insurance<p>
    <!-- <br> -->
    <!-- <p style="color:white; font-size:18px; font-weight:bold;">
    Busy? On the go? Life happening?
    </p> -->
    <!-- <p style="color:black; font-size:20px; font-weight:bold;">Get an online account and manage your insurance 24/7 -- anytime, anywhere. </p>
  <p style="color:white; font-size:15px; font-weight:bold;">Now with a single login to access all your State Farm products.</p>
  <br> -->

  <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

  <div>
    <p style="color:whitesmoke; font-size:26px; font-weight:bold;">Are you a customer, but don't have an online account?</p>
  <div>
  <div class="example-button-row">
  <button mat-button style="background-color:blue; width:140px; height:50px;" routerLink="sinup" (click)="singup()">Register Now</button>
  </div>
  
  </div>
  
  </div>

  

  `,
  styles: [`
  c1{
    font-size: px;
    font-weight:bold;
  }

  .offer{
    display: flex;
  }
    .example-card {
  max-width: 200px;
  margin-right: 20px;

  /* max-height: 200px; */

}

.example-header-image {
  background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
  background-size: 90%;
}
  `
  ]
})
export class OfferComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  singup(){
    this.router.navigate(['sinup']);
  }

}
