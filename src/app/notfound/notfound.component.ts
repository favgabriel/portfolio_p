import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  template: `
    <section class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-[120px] lg:text-[200px] font-primary font-bold text-gradient leading-none">404</h1>
        <h2 class="h2 text-pink-700 mt-4">Page Not Found</h2>
        <p class="mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <button class="btn btn-lg" (click)="goHome()">Go Home</button>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NotfoundComponent {
  constructor(private router: Router) {}
  goHome(): void {
    this.router.navigate(['home'])
  }
}
