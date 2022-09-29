import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from './policy.service';
import { map, mergeMap } from 'rxjs';
import IPolicy from './policy-interface';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-view-policy',
  template: `
     <mat-card >
      <mat-card-content>

      <div style="margin-left:20px; margin-right:20px" #content>
                <legend>Insurance Policy</legend>
                <div><label>Policy No: {{policy.Policy_number}}</label></div>

              <div > 
                <label>MWA General Insurance Company </label>
                <p>Address: ICICI Bank Tower, Bandra KurlaComplex,Bandra(East) Mumbai -400 051</p>
                <p>Insurance Category: {{car.type}}</p>
                <label>Insurance Start Date: {{policy.signed_date}}</label>
                <label>Insurance Expaierd Data: {{policy.expir_date}}
                </label>
                
              </div>
              <div >
                <p>Customer No : {{user._id}} 
                </p> 
                <p>Full Name : {{user.fullname}} 
                <label style="margin-left:20px">Age: {{user.age}} </label>
                <label>Gender : {{user.gender}} </label> 
                </p>  
                <p>Address: {{user.address.street}},{{user.address.city}},{{user.address.zipcode}},{{user.address.state}}</p>

              </div>
              <!-- <div >
                <p>Vehicle No: {{car._id}}
                <label  style="margin-left:20px">Plate No: {{car.plate}}</label>
                </p>
                <p>Vehicle Identification Number: {{car.vehicle_identification_number}}</p>
                <label>Manufacturing Year: {{car.year}}</label>

              </div>   -->
              <!-- <div>
              <p>Driving Licence: {{car.driving_licence}}
              <label style="margin-left:20px">Vehicle Type: {{car.type}}</label>
              <label>Price of the Vehicle: {{car.price}}</label>
              </p>
              <p>Policy Signed Date: {{policy.signed_date}}</p>
              
              </div> -->
              <p>Amount of Base Premium: {{policy.base_premium}}</p>
              <label>Amount of Auto Premium: {{policy.auto_premium}}</label>
              <p>Amount of Load: {{policy.load}}</p>
              <label>Amount of Discount: {{policy.discount}}</label>
              <p>Total Payment: {{policy.total_payment}}</p>
            
      </div>

      <div class="button">
        <button mat-button mat-raised-button color="primary" (click)="makePdf()">Download PDF</button>
        <a routerLink="cars" mat-button color="primary" (click)="cancel()">Cancel</a>
      </div>

      </mat-card-content>
    </mat-card>
  `,
  styles: [`
  
label{
  margin-right:10px;
}   
 
  `
  ]
})
export class ViewPolicyComponent implements OnInit {

  policy!:IPolicy
  car!:any;
  user!:any;

  @ViewChild('content') content!: ElementRef;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private policyService:PolicyService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map((param)=>param.get('car_Id') as string),
      mergeMap(car_Id=>this.policyService.getPolicy(car_Id))
    ).subscribe((response)=>{
        this.policy=response.data;
        this.car=this.policy.car;
        this.user=this.policy.user;

    });
  }


  makePdf() { 
    html2canvas(this.content.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 270;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.setFont("Times-Roman");
      PDF.setFontSize(2);
      PDF.setTextColor(7);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 5, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.content.nativeElement.innerHTML)
      PDF.save('Policy number-'+ this.policy.Policy_number.toUpperCase().toString());
    });
  }

  cancel(){
    this.router.navigate(['','cars']);
  }

}
