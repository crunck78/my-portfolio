import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OpenCloseStatus } from '../header.types';
import { openCloseAnimationMenu, openCloseAnimationToggler } from './animations/openClose.animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [openCloseAnimationMenu, openCloseAnimationToggler],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class NavBarComponent {
  @Input() toggleMenu: OpenCloseStatus = 'closed';
  @Output() toggleMenuChange = new EventEmitter<OpenCloseStatus>();

  toggleView(event: Event) {
    event.preventDefault();
    this.toggleMenuChange.emit(this.toggleMenu === 'open' ? 'closed' : 'open');
  }
}
