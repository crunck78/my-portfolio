import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

const dependencies = [SharedModule];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class FooterModule {}
