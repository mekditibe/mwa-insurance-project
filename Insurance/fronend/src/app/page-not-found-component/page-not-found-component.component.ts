import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found-component',
  template: `
   <mat-card>
      <mat-card-title>Page Not Found: Error 404</mat-card-title>
      <mat-card-content>
        <div style="font-size:26; font-weight:bold">The page you are looking for is not fund.</div>
      </mat-card-content>
   </mat-card>
  `,
  styles: [
  ]
})
export class PageNotFoundComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
