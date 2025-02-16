import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openCloseAnimationHeader } from './header.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [openCloseAnimationHeader]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header!: ElementRef;
  @ViewChild('headerOpener') headerOpener!: ElementRef;
  toggleViewHeader: 'closed' | 'open' = 'closed';
  toggleViewOpener: 'open' | 'closed' = 'open';
  headerState$ = new BehaviorSubject<'closed' | 'open'>('open');
  openerState$ = new BehaviorSubject<'closed' | 'open'>('closed');
  menuState: 'closed' | 'open' = 'closed';

  get arrowTransformation() {
    return this.toggleViewHeader == 'closed' ? 'translate(45, 50) rotate(180, 6.99996, 8)' : 'translate(45, 45) ';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.headerState$.subscribe(state => this.toggleViewHeader = state);
      this.openerState$.subscribe(state => this.toggleViewOpener = state);
    })
  }

  toggleHeader(event: Event) {
    event.preventDefault();
    if (this.toggleViewHeader == 'open') {
      this.headerState$.next('closed');
      this.openerState$.next('open');
    }
    else {
      this.headerState$.next('open');
      this.openerState$.next('closed');
    }

  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.toggleViewHeader == 'open') {
      this.headerState$.next('closed');
      this.openerState$.next('open');
      this.menuState = 'closed';
    }
  }

  menuViewState(menuState: 'closed' | 'open') {
    this.menuState = menuState;
  }

}
