import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  template: `
    <section class="section min-h-screen">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row gap-x-3">
          <div [@fadeIn] class="flex-1 lg:bg-profile lg:bg-bottom bg-no-repeat object-contain mix-blend-lighten mb-12 lg:mb-0">
            <h2 class="h2 text-pink-700 mb-6">What I do</h2>
            <h3 class="h3 max-w-[455px] mb-16">Mobile & Backend Software Engineer specializing in real-time systems and production reliability</h3>
            <button class="btn btn-lg" (click)="portfolio()">See my work</button>
          </div>
          <div [@fadeInRight] class="flex-1">
            <div *ngFor="let service of services; let i = index" class="border-b border-white/20 mb-[38px] flex">
              <div class="max-w-[476px]">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-2xl">{{service.icon}}</span>
                  <h4 class="text-[20px] tracking-wider font-primary font-semibold">{{service.name}}</h4>
                </div>
                <p class="font-secondary leading-tight text-white/70">{{service.description}}</p>
                <div class="flex flex-wrap gap-2 mt-3">
                  <span *ngFor="let tech of service.techs" class="px-2 py-1 text-xs bg-white/10 rounded-full text-white/50">{{tech}}</span>
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
        icon: '📱',
        name: 'Mobile App Development',
        description: 'Production-grade Android applications with Kotlin, Firebase, WebRTC, and real-time data synchronization.',
        techs: ['Kotlin', 'Android SDK', 'Firebase', 'WebRTC', 'Retrofit'],
      },{
        icon: '⚙️',
        name: 'Backend & API Design',
        description: 'Scalable REST APIs and microservices with Python Flask, Node.js, Kafka, and Spring Framework.',
        techs: ['Python', 'Flask', 'Node.js', 'Kafka', 'Spring'],
      },{
        icon: '☁️',
        name: 'Cloud & DevOps',
        description: 'AWS cloud infrastructure, CI/CD pipelines, serverless functions, and production monitoring systems.',
        techs: ['AWS', 'Firebase', 'CI/CD', 'Monitoring'],
      },{
        icon: '🔌',
        name: 'IoT & Embedded Systems',
        description: 'Hardware-software integration with Arduino, PCB design, and real-time sensor data dashboards.',
        techs: ['Arduino', 'PCB Design', 'SolidWorks', 'Embedded'],
      },{
        icon: '🗄️',
        name: 'Database & Data Systems',
        description: 'MySQL database design, Firestore real-time sync, Room local storage, and data analytics pipelines.',
        techs: ['MySQL', 'Firestore', 'Room DB', 'Data Analytics'],
      }
    ]

    constructor(private router: Router){}
    portfolio(): void{
      this.router.navigate(['portfolio'])
    }
}
