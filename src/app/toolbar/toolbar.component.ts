import { Component } from '@angular/core';
import { faShopware } from '@fortawesome/free-brands-svg-icons';
import { faContactBook, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase, faClipboard, faClipboardList, faHomeAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div class="container mx-auto">
        <div class=" w-full bg-black/20 h-[96px] backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-5 flex justify-between text-2xl text-white/50 items-center">
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="home" routerLinkActive="active" ariaCurrentWhenActive="page"><fa-icon [icon]="homeIcon" ></fa-icon></a>
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="about" routerLinkActive="active" ariaCurrentWhenActive="page"><fa-icon [icon]="aboutIcon"></fa-icon></a>
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="services" routerLinkActive="active" ariaCurrentWhenActive="page"><fa-icon [icon]="serviceIcon"></fa-icon></a>
          <a class="cursor-pointer w-[60px] h-[60px] flex items-center justify-center" routerLink="portfolio" routerLinkActive="active" ariaCurrentWhenActive="page"><fa-icon [icon]="portfolioIcon"></fa-icon></a>
        </div>
     </div>
    </nav>
  `,
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  homeIcon = faHomeAlt
  aboutIcon = faUser
  portfolioIcon = faBriefcase
  serviceIcon= faClipboardList;
}
