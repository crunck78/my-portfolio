import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ControlErrorPipe } from './pipes/control-error.pipe';
import { DigitsCounterPipe } from './pipes/digits-counter.pipe';
import { RatioCounterPipe } from './pipes/ratio-counter.pipe';

const dependencies = [ControlErrorPipe, DigitsCounterPipe, RatioCounterPipe, SharedModule];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class FormFieldModule {}
