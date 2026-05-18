import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div class="container mx-auto">
        <div class="w-full bg-black/20 h-[96px] backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-5 flex justify-between text-2xl text-white/50 items-center">
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="home" routerLinkActive="active" ariaCurrentWhenActive="page" aria-label="Home">&#127968;</a>
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="about" routerLinkActive="active" ariaCurrentWhenActive="page" aria-label="About">&#128100;</a>
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="services" routerLinkActive="active" ariaCurrentWhenActive="page" aria-label="Services">&#9881;</a>
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="portfolio" routerLinkActive="active" ariaCurrentWhenActive="page" aria-label="Portfolio">&#128188;</a>
        </div>
     </div>
    </nav>
  `,
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {}
