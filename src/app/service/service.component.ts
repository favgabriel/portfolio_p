import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  template: `
    <section class="section">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row gap-x-3">
          <div  [@fadeIn] class="flex-1 lg:bg-profile lg:bg-bottom bg-no-repeat object-contain mix-blend-lighten mb-12 lg:mb-0">
            <h2 class="h2 text-pink-700 mb-6">What I do</h2>
            <h3 class="h3 max-w-[455px] mb-16">I'm a fullstack web and android developer with over 5 years of experience</h3>
            <button class="btn btn-lg" (click)="portfolio()">See my work</button>
          </div>
          <div [@fadeInRight] class="flex-1">
            <div class="h-[100vh]">
              <div *ngFor="let service of services" class="border-b border-white/20 mb-[38px] h-[135px] flex">
                <div class="max-w-[476px]">
                  <h4 class="text-[20px] tracking-wider font-primary font-semibold mb-6">{{service.name}}</h4>
                  <p class="font-secondary leading-tight mb-6">{{service.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./service.component.css'],
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
  ]
})
export class ServiceComponent {

    services = [
      {
        name:'FullStack Development',
        description:"I build fullstack web applications, with MERN and MEAN stack technologies",
      },{
        name:'Android App Development',
        description:'I build fully native mobile applications with Java and Kotlin',
      },{
        name:'CAD Design',
        description:'I design and model 2D drawings into 3D models with SOLIDWORKS',
      },{
        name:'Project Management',
        description:'I manage projects delivery a concise technical presentation',
      },{
        name:'Embedded System design',
        description:'I build and automate engineering designs with Arduino',
      }
    ]

    constructor(private router: Router){

    }
    portfolio(): void{
      this.router.navigate(['portfolio'])
    }
}
