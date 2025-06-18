import { Component } from '@angular/core';
import { PortfolioModule } from './portfolio.module';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  imports: [PortfolioModule],
})
export class PortfolioComponent {}
