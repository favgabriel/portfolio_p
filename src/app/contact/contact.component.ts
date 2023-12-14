import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact',
  template: `
    <section class="py-16 lg:section" id="contact">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row">
          <div [@fadeDown] class="flex-1">
            <div>
              <h4 class="text-xl uppercase text-pink-700 font-medium mb-2 tracking-wide">Get in touch now</h4>
              <h2 class="text-[45px] lg:text-[90px] leading-none mb-12">Let's build <br/> together!</h2>
            </div>
          </div>
          <form #contactform="ngForm" (ngSubmit)="sendemail()" [@fadeRight] class="flex-1 border rounded-2xl flex flex-col gap-y-6 pb-24 p-6 items-start">
            <input [(ngModel)]="name" name="name" required class="form-control ng-valid bg-transparent border-b py-3 outline-none w-full
             placeholder:text-white focus:border-pink-700 transition-all" type="text" placeholder="your name" />
            <input [(ngModel)]="email" name="email" required class="form-control ng-valid bg-transparent border-b py-3 outline-none w-full
             placeholder:text-white focus:border-pink-700 transition-all" type="email" placeholder="your email" />
            <textarea [(ngModel)]="message" name="message" required class="form-control ng-valid bg-transparent border-b py-12 outline-none w-full
             placeholder:text-white focus:border-pink-700 transition-all resize-none mb-12" placeholder="type your message"></textarea>
            <button [disabled]="" class="btn btn-lg" type="submit">Send message</button>
          </form>
        </div>
      </div>
  </section>
  `,
  styleUrls: ['./contact.component.css'],
  animations:[
    trigger('fadeDown',[
      transition(':enter',[
        style({transform:"translateY(-100%)",opacity:0}),
        animate(1000,style({transform:"translateY(0%)",opacity:1}))
      ]),
      transition(':leave',[
        style({transform:'translateY(100%)',opacity:0})
      ])
    ]),
    trigger('fadeRight',[
      transition(':enter',[
        style({transform:"translateX(100%)",opacity:0}),
        animate(1000,style({transform:"translateX(0%)",opacity:1}))
      ]),
      transition(':leave',[
        style({transform:'translateX(-100%)',opacity:0})
      ])
    ]),
  ]
})
export class ContactComponent {
  message: string="";
  email: string="";
  name: string ="";
  constructor(private emailclient: EmailService){}

  sendemail(){
    this.emailclient.sendEmail(this.name,this.email,this.message).subscribe({
      complete:()=> {this.name="",this.email="",this.message=""},
      error: err => alert("error sending email.")
    })
    console.log(this.email)
  }
}
