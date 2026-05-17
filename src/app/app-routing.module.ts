import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent, title:'Home | Favour Gabriel'},
{path:'about',component:AboutComponent, title:'About | Favour Gabriel'},
{path:'portfolio',component:PortfolioComponent, title:'Portfolio | Favour Gabriel'},
{path:'services',component:ServiceComponent, title:'Services | Favour Gabriel'},
{path:'contact',component:ContactComponent, title:'Contact | Favour Gabriel'},
{path:'**',component:NotfoundComponent, title:'Not Found | Favour Gabriel'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
