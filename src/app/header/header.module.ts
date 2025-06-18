import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const dependencies = [NavBarComponent, SharedModule];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class HeaderModule {}
