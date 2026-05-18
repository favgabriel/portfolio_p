import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../email.service';
import { ModalConfig } from '../modals/modal/modal.config';
import { ModalComponent } from '../modals/modal/modal.component';

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
              <div class="space-y-4 mb-8">
                <a href="mailto:aighangbe@gmail.com" class="flex items-center gap-3 text-white/70 hover:text-pink-400 transition-colors">
                  <span class="text-pink-400">&#9993;</span>
                  <span>aighangbe@gmail.com</span>
                </a>
                <a href="tel:+2348165005846" class="flex items-center gap-3 text-white/70 hover:text-pink-400 transition-colors">
                  <span class="text-pink-400">&#9742;</span>
                  <span>+234 816 500 5846</span>
                </a>
                <a href="https://linkedin.com/in/favour-gabriel" target="_blank" class="flex items-center gap-3 text-white/70 hover:text-pink-400 transition-colors">
                  <span class="text-pink-400">&#128188;</span>
                  <span>linkedin.com/in/favour-gabriel</span>
                </a>
              </div>
            </div>
          </div>
          <form #contactform="ngForm" (ngSubmit)="sendemail()" [@fadeRight] class="flex-1 border rounded-2xl flex flex-col gap-y-6 pb-24 p-6 items-start">
            <input [(ngModel)]="name" name="name" required class="form-control ng-valid bg-transparent border-b py-3 outline-none w-full
             placeholder:text-white focus:border-pink-700 text-white transition-all" type="text" placeholder="your name" #nname="ngModel"/>
             <div *ngIf="nname.invalid && (nname.dirty || nname.touched)" class="alert alert-danger">
              <div *ngIf="nname.errors?.['required']">Name is required</div>
             </div>
            <input [(ngModel)]="email" name="email" required class="form-control ng-valid bg-transparent border-b py-3 outline-none w-full
             placeholder:text-white focus:border-pink-700 text-white transition-all" type="email" placeholder="your email" #nemail="ngModel"/>
             <div *ngIf="nemail.invalid && (nemail.dirty || nemail.touched)" class="alert alert-danger">
              <div *ngIf="nemail.errors?.['required']">Email is required</div>
              </div>
              <textarea [(ngModel)]="message" name="message" required class="form-control ng-valid bg-transparent border-b py-12 outline-none w-full
             placeholder:text-white focus:border-pink-700 text-white transition-all resize-none mb-12" placeholder="type your message" #nmessage="ngModel"></textarea>
             <div *ngIf="nmessage.invalid && (nmessage.dirty || nmessage.touched)" class="alert alert-danger">
              <div *ngIf="nmessage.errors?.['required']">Message cannot be empty</div>
              </div>
               <div *ngIf="formSubmitted" class="w-full text-center py-2 rounded" [class.text-green-400]="formSuccess" [class.text-red-400]="!formSuccess">
                 {{ formSuccess ? 'Message sent successfully!' : 'Failed to send. Please try again.' }}
               </div>
               <button [disabled]="nname.invalid || nemail.invalid || nmessage.invalid || sending" class="btn btn-lg flex items-center gap-2" type="submit">
                 <span *ngIf="sending" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                 {{ sending ? 'Sending...' : 'Send message' }}
               </button>
          </form>
        </div>
        <app-modal #modal [modalConfig]="modalConfig">{{resp}}</app-modal>
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
export class ContactComponent implements OnInit{
  @ViewChild('contactform', {static: false}) myForm!: NgForm;
  message: string="";
  email: string="";
  name: string ="";
  sending = false;
  formSubmitted = false;
  formSuccess = false;
  modalConfig: ModalConfig = {
    modalTitle: 'Message Status',
    dismissButtonLabel: 'Close',
    hideCloseButton: () => true,
  };
  @ViewChild('modal') private modalcomponent!: ModalComponent
  resp!:string

  constructor(private emailclient: EmailService){}

  ngOnInit(): void {
  }

  sendemail(){
    if (this.sending) return;
    this.sending = true;
    this.formSubmitted = false;
    this.emailclient.sendEmail(this.name, this.email, this.message)
    .subscribe({
      next: () => {
        this.sending = false;
        this.formSubmitted = true;
        this.formSuccess = true;
        this.myForm.resetForm()
        this.resp="Alright great!, i have received your message, i would be in touch soon"
        this.openModal()
      },
      error: () => {
        this.sending = false;
        this.formSubmitted = true;
        this.formSuccess = false;
        this.resp = "Error occured sending message to me, please you can try again !"
        this.openModal()
      }
    });
  }

  async openModal(){
    return await this.modalcomponent.open()
  }
}
