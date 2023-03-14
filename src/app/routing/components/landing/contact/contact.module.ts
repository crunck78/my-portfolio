import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormFieldModule } from './form-field/form-field.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FormFieldModule,
    SharedModule,
  ],
  exports: [ContactComponent]
})
export class ContactModule { }
