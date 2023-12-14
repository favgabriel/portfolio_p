import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  template: `<section class="section">
    <div class="container mx-auto h-[100vh]">
      <div class="flex flex-col lg:flex-row gap-x-10">
        <div [@fadeIn] class="flex-1 flex flex-col gap-y-12 mb-10 lg:mb-0">
          <div>
            <h2 class="h2 leading-tight text-pink-700">
              My Most Recent <br/>
              Work.
            </h2>
            <p class="max-w-sm mb-16">
              Browse and check my most recent completed projects
            </p>
            <button (click)="contact()" class="btn btn-sm">
              View More Projects
            </button>
          </div>
          <div class="group relative overflow-hidden border-2 border-white/50 rounded-xl">
            <div class="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
            <img class=" group-hover:scale-125 transition-all duration-500" [src]="project1" alt="project1">
            <div class="absolute bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
              <span class="text-gradient">Android</span></div>
            <div class="absolute bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
              <span class="text-3x1 text-white">FindMe App</span>
            </div>
          </div>
        </div>
        <div [@fadeInRight] class="flex-1 flex flex-col gap-y-10">
          <div class="group relative overflow-hidden border-2 border-white/50 rounded-xl">
            <div class="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
            <img class=" group-hover:scale-125 transition-all duration-500" [src]="project3" alt="project1">
            <div class="absolute bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
              <span class="text-gradient">Web Application</span></div>
            <div class="absolute bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
              <span class="text-3x1 text-white">Heo Banks</span>
            </div>
          </div>

          <div class="group relative overflow-hidden border-2 border-white/50 rounded-xl">
            <div class="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
            <img class=" group-hover:scale-125 transition-all duration-500" [src]="project2" alt="project1">
            <div class="absolute bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
              <span class="text-gradient">Web design</span></div>
            <div class="absolute bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
              <span class="text-3x1 text-white">Thermo</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>`,
  styleUrls: ['./portfolio.component.css'],
  animations:[
    trigger('fadeIn',[
      transition(':enter',[
        style({transform:'translateX(-100%)',opacity:0}),
        animate(1000,style({opacity:1, transform:'translateX(0)'})),
      ]),
      transition(':leave',[
        animate(1000,style({opacity:0, transform:'translateX(0)'})),
      ])
    ]),
    trigger('fadeInRight',[
      transition(':enter',[
        style({transform:'translateX(100%)',opacity:0}),
        animate(1000,style({opacity:1, transform:'translateX(0)'})),
      ]),
      transition(':leave',[
        animate(1000,style({opacity:0, transform:'translateX(0)'})),
      ])
    ])
  ],
})
export class PortfolioComponent {
  project1 = "/assets/img/soft.jpg"
  project2 = "/assets/img/project2.png"
  project3 = "/assets/img/project3.png"

  constructor(private router: Router){

  }
  contact(): void{
    window.location.href="https://github.com/favgabriel"
  }
}
