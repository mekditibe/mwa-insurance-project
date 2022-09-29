import { CarService } from './car.service';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appCar]'
})
export class CarDirective {

  @Input() appCar:string='';
  carDB:string='';
  constructor(private e: ElementRef,private renderer2: Renderer2, private carService:CarService, private router:Router) { }
  @HostListener('click') onRemove(){
    console.log(this.appCar);
    this.carService.deleteCar(this.appCar).subscribe((result)=>{
      console.log("dblclick");
      this.carDB=result.data;
    });
    this.router.navigate(['cars']);
  }
}
