import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() maxLength!: number;
  @Input() customHasError!: boolean;
  @Input() customIsValid!: boolean;

  get hasError() {
    return this.customHasError !== undefined
      ? this.customHasError
      : this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  get isValid() {
    return this.customIsValid !== undefined
      ? this.customIsValid
      : this.control?.valid && (this.control?.dirty || this.control?.touched);
  }
}
