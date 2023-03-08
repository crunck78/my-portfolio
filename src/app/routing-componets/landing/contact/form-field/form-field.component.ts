import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() maxLength!: number;

  constructor() {}

  ngOnInit(): void {
  }

}
