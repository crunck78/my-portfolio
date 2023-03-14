import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { ProjectComponent } from './project/project.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [PortfolioComponent, ProjectComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [PortfolioComponent]
})
export class PortfolioModule { }
