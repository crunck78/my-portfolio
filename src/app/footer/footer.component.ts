import { Component } from '@angular/core';
import { FooterModule } from './footer.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [FooterModule],
})
export class FooterComponent {}
