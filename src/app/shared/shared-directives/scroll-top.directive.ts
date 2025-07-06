import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTop]',
})
export class ScrollTopDirective {
  @HostListener('click', ['$event'])
  @HostListener('touchstart', ['$event'])
  scrollTop(event: Event) {
    event.preventDefault();
    if (window.scrollY > 0) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}
