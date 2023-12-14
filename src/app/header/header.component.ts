import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="py-8">
      <div class="pr-8 pl-8 mx-auto">
        <div class="flex justify-between items-center">
          <h2 class="h2 capitalize">
            <a routerLink="/">
              Favour<span class="text-[20px] text-pink-600">Gabriel</span>
            </a>
          </h2>

          <button class="btn btn-sm" (click)="contact()">Contact me</button>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router){

  }
  contact(): void{
    this.router.navigate(['contact'])
  }

}
