import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTypeWriter]'
})
export class TypeWriterDirective implements OnInit{
  private i = 0
  @Input() typingspeedMilliseconds = 300
  @Input() wordArray: string[] =["hello world..."]
  @Input() textColor = "white"
  @Input() fontSize = "20px"
  @Input() blinkwidth = "2px"
  @Input() appTypeWriter: string | undefined


  constructor(private el: ElementRef,private renderer :Renderer2) { }

  ngOnInit(): void {
    this.typingEffect()
  }

  private initVariable(){
    this.renderer.setStyle(this.el.nativeElement,"color",this.textColor)
    this.renderer.setStyle(this.el.nativeElement,"font-size",this.fontSize)
    this.renderer.setStyle(this.el.nativeElement,"padding","0.1em")
  }

  private typingEffect(){
    const word = this.wordArray[this.i].split("")

    const loopTyping =()=>{
      if(word.length >0){
        this.el.nativeElement.innerHTML += word.shift()
      }else{
        return;
      }
      setTimeout(loopTyping,this.typingspeedMilliseconds)
    }
    loopTyping();
  }

}
