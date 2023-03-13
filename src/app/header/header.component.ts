import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openCloseAnimationHeader } from './header.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [openCloseAnimationHeader]
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('header') header!: ElementRef;
  toggleViewHeader: 'closed' | 'open' = 'open';
  headerState$ = new BehaviorSubject<'closed' | 'open'>('open');
  menuState !: 'closed' | 'open';

  constructor() { }
  ngAfterViewInit(): void {
    this.headerState$.subscribe(state => this.toggleViewHeader = state)
  }

  toggleHeader() {
    if (this.toggleViewHeader == 'open')
      this.headerState$.next('closed');
    else
      this.headerState$.next('open');
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.toggleViewHeader == 'open')
      this.headerState$.next('closed');
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (event.y < this.header?.nativeElement.getBoundingClientRect().height && this.toggleViewHeader == 'closed')
      this.headerState$.next('open');
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    if (this.menuState == 'closed')
      this.headerState$.next('closed');
  }

  menuViewState(menuState: 'closed' | 'open') {
    this.menuState = menuState;
    // this.headerState$.next(menuState);
  }

}
