import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectComponent } from './project/project.component';

const dependencies = [ProjectComponent, SharedModule];
@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class PortfolioModule {}
