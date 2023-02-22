import { Component } from '@angular/core';
import { openCloseAnimationMenu, openCloseAnimationToggler } from './animations/openClose.animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [openCloseAnimationMenu, openCloseAnimationToggler]
})
export class NavBarComponent {

  toggleMenu: "closed" | "open" = "closed";

  toggleView(){
    this.toggleMenu = this.toggleMenu == "open" ? "closed" : "open";
  }

}
