import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { openCloseAnimationHeader } from './header.animations';
import { OpenCloseStatus } from './header.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [openCloseAnimationHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  headerState$ = new BehaviorSubject<OpenCloseStatus>('open');
  openerState$ = new BehaviorSubject<OpenCloseStatus>('closed');
  menuState: OpenCloseStatus = 'closed';

  arrowTransform$ = this.headerState$.pipe(
    map((state) =>
      state === 'closed' ? 'translate(45, 50) rotate(180, 6.99996, 8)' : 'translate(45, 45)',
    ),
  );

  toggleHeader(event: Event) {
    event.preventDefault();
    const current = this.headerState$.getValue();
    this.headerState$.next(current === 'open' ? 'closed' : 'open');
    this.openerState$.next(current === 'open' ? 'open' : 'closed');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.headerState$.getValue() == 'open') {
      this.headerState$.next('closed');
      this.openerState$.next('open');
      this.menuState = 'closed';
    }
  }
}
