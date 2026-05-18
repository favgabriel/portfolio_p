import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-about',
  template:`
  <section class="section min-h-screen">
    <div class="container mx-auto">
      <div class="flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-20 lg:gap-y-0">
        <div [@fadeIn] class="flex-1 bg-profile bg-contain bg-no-repeat h-[640px] mix-blend-color-dodge bg-top"></div>
        <div [@fadeInRight] class="flex-1">
          <h2 class="h2 text-pink-700 mb-4">About me</h2>
          <ngx-typed-js [strings]="['Mobile & Backend Software Engineer with 4+ years of production experience.',
          'Building real-time systems, API design, and production reliability.',
          'Mechanical Engineer with expertise in IoT, PCB design, and embedded systems.']"
          [loop]="true"
          [showCursor]="false">
            <h3 class="typing mb-4 h3"></h3>
          </ngx-typed-js>
          <div class="mb-6 space-y-2">
            <p class="text-base cursor-default text-white/70">
              Software engineer with a proven track record owning features end-to-end — from Firebase Cloud Functions to Kotlin Android clients. Seeking to contribute to innovative product development in the UK market.
            </p>
          </div>
          <div class="flex gap-x-6 lg:gap-x-10 mb-12">
              <div>
                <div class="font-tertiary text-gradient text-[40px] mb-2">
                  {{experience_count}}+
                </div>
                <div class="font-normal text-sm tracking-[2px]">
                  Years of <br/> experience
                </div>
              </div>
              <div>
                <div class="font-tertiary text-gradient text-[40px] mb-2">
                  {{project_count}}+
                </div>
                <div class="font-normal text-sm tracking-[2px]">
                  Projects <br/> Completed
                </div>
              </div>
              <div>
                <div class="font-tertiary text-gradient text-[40px] mb-2">
                  {{clients_count}}+
                </div>
                <div class="font-normal text-sm tracking-[2px]">
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
  constructor(private router: Router){}
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
      this.experience_count === 4 ? this.experience_count : this.experience_count++
      this.project_count === 10 ? this.project_count : this.project_count++
      this.clients_count === 5 ? this.clients_count : this.clients_count++
    })
  }
}
