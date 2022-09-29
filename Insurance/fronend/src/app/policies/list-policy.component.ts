import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IPolicy from './policy-interface';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-list-policy',
  template: `
   <mat-card>
  <mat-card-title>List Policy</mat-card-title>
  <mat-card-content>
  <table class="table table-striped">
    <thead>
        <tr>
            <th style="width: 30%" scope="col">Policy number</th>
            <th style="width: 30%" scope="col">Start Date</th>
            <th style="width: 30%" scope="col">End Date</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let c of listOfPolicy;index as i">
            <td ><a (click)="policy(c)" [routerLink]="['policies']"> {{ c.Policy_number}}</a></td>
            <td>{{ c.signed_date}}</td>
            <td>{{ c.expir_date}}</td>
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

export class ListPolicyComponent implements OnInit {

  listOfPolicy:IPolicy[]=[];

  constructor(private policyService:PolicyService, private router:Router) {
    this.getPolicies();
   }

  ngOnInit(): void {
  }
  policy(c:IPolicy){
    const car_Id:string= c.service_Id;
    this.router.navigate(['','policies','view', car_Id]);
  }

  getPolicies(){
    this.policyService.getPolicies().subscribe((response)=>{
      this.listOfPolicy=response.data;
    })
  }

}
