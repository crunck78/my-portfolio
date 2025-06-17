import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { ControlErrorPipe } from './pipes/control-error.pipe';
import { DigitsCounterPipe } from './pipes/digits-counter.pipe';
import { RatioCounterPipe } from './pipes/ratio-counter.pipe';

@NgModule({
  declarations: [FormFieldComponent, ControlErrorPipe, DigitsCounterPipe, RatioCounterPipe],
  imports: [CommonModule],
  exports: [FormFieldComponent],
})
export class FormFieldModule {}
