import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpenCloseStatus } from '../header.types';
import { openCloseAnimationMenu, openCloseAnimationToggler } from './animations/openClose.animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [openCloseAnimationMenu, openCloseAnimationToggler],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, LayoutModule],
})
export class NavBarComponent {
  @Input() toggleMenu: OpenCloseStatus = 'closed';
  @Output() toggleMenuChange = new EventEmitter<OpenCloseStatus>();

  breakpointObserver = inject(BreakpointObserver);

  get isMobileView$() {
    return this.breakpointObserver.observe(['(max-width: 650px)']).pipe(map((result) => result.matches));
  }

  toggleView(event: Event) {
    event.preventDefault();
    this.toggleMenuChange.emit(this.toggleMenu === 'open' ? 'closed' : 'open');
  }
}
