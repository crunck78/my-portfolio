import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  readonly name = new FormControl('', Validators.compose(
    [Validators.required, Validators.maxLength(50)]
  ));
  readonly email = new FormControl('', Validators.compose(
    [Validators.required, Validators.email, Validators.maxLength(50)]
  ));
  readonly message = new FormControl('', Validators.compose(
    [Validators.required, Validators.maxLength(250)]
  ));

  readonly contactForm = new FormGroup({});

  constructor() {
    this.contactForm.setControl('name',this.name);
    this.contactForm.setControl('email', this.email);
    this.contactForm.setControl('message', this.message);
  }

  ngOnInit(): void {
  }

  getErrorMessage(control: AbstractControl | null) {
    console.log(control);
  }

}
