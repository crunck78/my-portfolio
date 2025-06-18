import { Component } from '@angular/core';
import { ScrollTopDirective } from '../../shared-directives/scroll-top.directive';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [ScrollTopDirective],
})
export class LogoComponent {}
