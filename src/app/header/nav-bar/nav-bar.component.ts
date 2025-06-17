import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { openCloseAnimationMenu, openCloseAnimationToggler } from './animations/openClose.animations';
import { OpenCloseStatus } from '../header.types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [openCloseAnimationMenu, openCloseAnimationToggler],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  @Input() toggleMenu: OpenCloseStatus = 'closed';
  @Output() toggleMenuChange = new EventEmitter<OpenCloseStatus>();

  toggleView(event: Event) {
    event.preventDefault();
    this.toggleMenuChange.emit(this.toggleMenu === 'open' ? 'closed' : 'open');
  }
}
