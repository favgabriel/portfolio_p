import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { animate } from 'popmotion';

@Directive({
  selector: '[appSlideup]'
})
export class SlideupDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    animate({
      from:"translateY(100%)",
      to:"translateY(0%)",
      type: "spring",
      onUpdate : (value)=>{
        this.renderer.setStyle(this.el.nativeElement,"transform",value)
      },
    })
  }

}
