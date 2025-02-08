import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  /**
   * The ID of target element
   */
  @Input() appScrollTo!: string;

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  async onClick(event: Event) {
    event.preventDefault();
    if (!this.isStartPage())
      await this.router.navigateByUrl('/');
    setTimeout(()=>{
      this.triggerScroll();
    }, 100);
  }

  @HostListener('touchstart', ['$event'])
  async onTouchStart(event: Event) {
    event.preventDefault();
    if (!this.isStartPage())
      await this.router.navigateByUrl('/');
    setTimeout(()=>{
      this.triggerScroll();
    }, 100);
  }

  triggerScroll() {
    const targetElement = document.getElementById(this.appScrollTo);
    if (targetElement) { // not secure but will work
      const top = targetElement.getBoundingClientRect().top + window.scrollY;
      if ('scrollBehavior' in document.documentElement.style) {
        // Use smooth scrolling if supported
        // chrome://flags/#smooth-scrolling activate, default not working
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
    const start = window.scrollY;
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
