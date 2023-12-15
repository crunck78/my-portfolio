import { Component, EventEmitter, Input, Output } from '@angular/core';
import { openCloseAnimationMenu, openCloseAnimationToggler } from './animations/openClose.animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [openCloseAnimationMenu, openCloseAnimationToggler]
})
export class NavBarComponent {

  @Input() toggleMenu: "closed" | "open" = "closed";
  @Output() toggleMenuEmit = new EventEmitter<"closed" | "open">();

  toggleView(event: Event){
    event.preventDefault();
    this.toggleMenu = this.toggleMenu == "open" ? "closed" : "open";
    this.toggleMenuEmit.emit(this.toggleMenu);
  }

}
