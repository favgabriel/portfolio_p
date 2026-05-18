import { style, transition, trigger, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
  <section class="min-h-[85vh] lg:min-h-[78vh] flex items-center">
  <div class="container mx-auto">
    <div class="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
      <div class="flex-1 text-center lg:text-left">
        <h1 appSlideup class="text-[45px] font-bold font-primary leading-[0.8] lg:text-[110px]">
          Hi, it's Favour <span>Gabriel</span>
        </h1>
        <div appSlideup class="mb-6 text-[30px] lg:text-[56px] font-secondary font-semibold uppercase leading-[1]">
          <span class="text-white mr-4">I AM A </span>
          <span class="text-pink-700">{{profession}}</span>
        </div>

        <p appSlideup class="mb-8 max-w-lg mx-auto lg:mx-0 text-white/70">
          Software engineer with 4+ years of production experience building real-time mobile applications and backend services. Available to relocate to the UK.
        </p>
        <div class="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0">
          <button class="btn btn-lg" (click)="contact()">Contact me</button>
          <a routerLink="/portfolio" class="text-gradient btn-link">My Portfolio</a>
        </div>
        <div class="flex text-[38px] gap-x-6 max-w-max mx-auto lg:mx-0">
          <a href="https://github.com/favgabriel" aria-label="GitHub" class="hover:text-pink-400 transition-colors">GH</a>
          <a href="https://linkedin.com/in/favour-gabriel" aria-label="LinkedIn" class="hover:text-pink-400 transition-colors">IN</a>
          <a href="https://twitter.com/favurgabriel" aria-label="Twitter" class="hover:text-pink-400 transition-colors">TW</a>
        </div>
      </div>
    <div [@slideInLeft] class="hidden lg:flex flex-1 lg:min-w-[482px]">
        <img [src]="image" alt="Favour Gabriel profile" class="mix-blend-lighten object-contain"/>
    </div>
</div>
</div>
</section>`,
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('slideInLeft',[
      transition(':enter',[
        style({transform:'translateX(100%)'}),
        animate('500ms ease-out', style({ transform:'translateX(0)'})),
      ]),
      transition(':leave',[
        animate('500ms ease-out', style({transform: 'translateX(100%)'})),
      ])
    ])
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  profession: string | undefined;
  image = "/assets/img/gab.png"
  professions: Array<string> = ['Mobile Developer', 'Backend Engineer', 'IoT Specialist']
  ngUnsubscribe: Subject<any> = new Subject()
  constructor(private router: Router){}
  contact(): void{
    this.router.navigate(['contact'])
  }
  ngOnInit(): void {
    this.profession = this.professions[0]
    interval(5000)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index = this.professions.findIndex((p) => p === this.profession)
        const next = this.professions[index + 1]
        this.profession = next ? next : this.professions[0]
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(0)
    this.ngUnsubscribe.complete()
  }
}
