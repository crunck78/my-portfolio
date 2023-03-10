import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective {

  @Input() scrollTo!: string; // The ID of the target element

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click')
  async onClick() {
    if (!this.isStartPage())
      await this.router.navigateByUrl('/');
    this.triggerScroll();
  }

  triggerScroll() {
    const targetElement = document.getElementById(this.scrollTo);
    if (targetElement) { // not secure but will work
      const top = targetElement.getBoundingClientRect().top + window.pageYOffset;
      if ('scrollBehavior' in document.documentElement.style) {
        // Use smooth scrolling if supported
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      } else {
        // Otherwise, use a polyfill for smooth scrolling
        this.scrollToPolyfill(top);
      }
    }
  }

  isStartPage() {
    return !this.router.url.startsWith('/imprint');
  }

  private scrollToPolyfill(scrollTo: number) {
    const start = window.pageYOffset;
    const distance = scrollTo - start;
    const duration = 300; // The duration of the scroll animation

    let currentTime = 0;

    const easeOutQuad = (t: number) => t * (2 - t);

    const animateScroll = () => {
      currentTime += 16;
      const newScrollPos = easeOutQuad(currentTime / duration) * distance + start;
      window.scrollTo(0, newScrollPos);
      if (currentTime < duration) {
        setTimeout(animateScroll, 16);
      }
    };

    animateScroll();
  }
}
