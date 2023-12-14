import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, pipe, takeUntil } from 'rxjs';

@Component({
  selector: 'app-about',
  template:`
  <section class="section">
    <div class="container mx-auto">
      <div class="flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-20 lg:gap-y-0 h-screen">
        <div [@fadeIn] class="flex-1 bg-profile bg-contain bg-no-repeat h-[640px] mix-blend-color-dodge bg-top"></div>
        <div [@fadeInRight] class="flex-1">
          <h2 class="h2 text-pink-700 mb-4">About me</h2>
          <ngx-typed-js [strings]="['I am a fullstack backend and android developer, with over 5 years of experience.',
          'I am a Mechanical Design Engineer with experience in 3D modelling, Embedded systems']"
          [loop]="true"
          [showCursor]="false">
            <h3 class="typing mb-4 h3"></h3>
          </ngx-typed-js>
          <div class="mb-6" *ngFor="let info of attributes">
            <p class="text-base cursor-default">{{info}}</p>
          </div>
          <div class=" flex gap-x-6 lg:gap-x-10 mb-12">
              <div>
                <div class="font-tertiary text-gradient text-[40px] mb-2">
                  {{experience_count}}+
                </div>
                <div class=" font-normal text-sm tracking-[2px]">
                  Years of <br/> experience
                </div>
              </div>
              <div>
                <div class="font-tertiary text-gradient text-[40px] mb-2">
                  {{project_count}}k+
                </div>
                <div class=" font-normal text-sm tracking-[2px]">
                  Projects <br/> Completed
                </div>
              </div>
              <div>
                <div class="font-tertiary text-gradient text-[40px] mb-2">
                  {{clients_count}}k+
                </div>
                <div class=" font-normal text-sm tracking-[2px]">
                  Satisfied <br/> Clients
                </div>
              </div>
          </div>
          <div class="flex gap-x-8 items-center">
            <button (click)="contact()" class="btn btn-lg">Contact me</button>
            <a routerLink="/portfolio" class="text-gradient btn-link">My Portfolio</a>
          </div>
        </div>
      </div>
    </div>

  </section>
`,
  styleUrls: ['./about.component.css'],
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
export class AboutComponent implements AfterViewInit, OnDestroy{
  ngOnDestroy(): void {
    this.unsubscribe.next(0)
    this.unsubscribe.complete()
  }
  experience_count = 0
  project_count = 0
  clients_count = 0
  unsubscribe: Subject<any> = new Subject()
  constructor(private router: Router){

  }
  contact(): void{
    this.router.navigate(['contact'])
  }
  ngAfterViewInit(): void {
    this.counter()
  }

  counter(){
    interval(600)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(()=>{
      this.experience_count ===7 ? this.experience_count: this.experience_count++
      this.project_count === 50 ? this.project_count : this.project_count++
      this.clients_count === 45 ? this.clients_count : this.clients_count++
    })
  }

  attributes =[
    "I have a wild range of Skills in delivery Excellent Client based applications in Both:",
    "Frontend using MERN and MEAN stack",
    "Backend with Node Js, Spring Boot, Flask",
    "Android with Java, Kotlin",
    "Cloud Services using AWS EC2, ElasticBeanstalk, Nginx, S3 bucket",
    "Embedded Designs using Arduino, Rasperry PI",
    "3D CAD designs with SOLIDWORKS"
  ]
}
