import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostListener('document:click', ['$event.target']) onClick(e) {
    if (e == this.elRef.nativeElement) {
      if (
        this.elRef.nativeElement.nextElementSibling.classList.contains('show')
      ) {
        this.elRef.nativeElement.nextElementSibling.classList.remove('show');
      } else {
        this.elRef.nativeElement.nextElementSibling.classList.add('show');
      }
    } else {
      this.elRef.nativeElement.nextElementSibling.classList.remove('show');
    }
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {}
}
