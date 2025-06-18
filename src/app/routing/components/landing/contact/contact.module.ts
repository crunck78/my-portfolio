import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormFieldComponent } from './form-field/form-field.component';

const dependencies = [ReactiveFormsModule, FormFieldComponent, SharedModule];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class ContactModule {}
