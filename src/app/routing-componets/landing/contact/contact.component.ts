import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  readonly NAME_REGEX = /^[A-Za-z .'-]+$/;
  readonly EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  readonly NAME_MAX_LENGTH = 50;
  readonly EMAIL_MAX_LENGTH = 50;
  readonly MESSAGE_MAX_LENGTH = 250;

  readonly name = new FormControl('', Validators.compose(
    [Validators.required, Validators.maxLength(50), Validators.pattern(this.NAME_REGEX)]
  ));
  readonly email = new FormControl('', Validators.compose(
    [Validators.required, Validators.pattern(this.EMAIL_REGEX), Validators.maxLength(50)]
  ));
  readonly message = new FormControl('', Validators.compose(
    [Validators.required, Validators.maxLength(250)]
  ));

  readonly contactForm = new FormGroup({});

  constructor(private http: HttpClient) {
    console.log(this.name);
    this.contactForm.setControl('name', this.name);
    this.contactForm.setControl('email', this.email);
    this.contactForm.setControl('message', this.message);
  }

  ngOnInit(): void {
  }

  getErrorMessage(control: AbstractControl | null) {
    console.log(control);
  }

  onSubmit() {
    const url = 'sendmail.php';
    const data = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value
    };

    this.http.post(url, data)
      .subscribe(
        {
          next: response => console.log('The message was successfully sent.'),
          error: error => console.log('An error occurred while sending the message.')
        }
      );
  }

}
