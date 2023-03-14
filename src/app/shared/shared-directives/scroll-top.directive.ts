import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick() {
    if (window.scrollY > 0) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

}
