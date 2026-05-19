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
          Software engineer with 4+ years of production experience building real-time mobile applications and backend services.
        </p>
        <div class="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0">
          <button class="btn btn-lg" (click)="contact()">Contact me</button>
          <a routerLink="/portfolio" class="text-gradient btn-link">My Portfolio</a>
        </div>
        <div class="flex text-[28px] gap-x-6 max-w-max mx-auto lg:mx-0">
          <a href="https://github.com/favgabriel" aria-label="GitHub" class="text-white/60 hover:text-pink-400 transition-colors" target="_blank">
            <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-18.1 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
          </a>
          <a href="https://linkedin.com/in/favour-gabriel" aria-label="LinkedIn" class="text-white/60 hover:text-pink-400 transition-colors" target="_blank">
            <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://twitter.com/favurgabriel" aria-label="Twitter" class="text-white/60 hover:text-pink-400 transition-colors" target="_blank">
            <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
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
  image = "assets/img/gab.png"
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
