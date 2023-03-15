import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormFieldModule } from './form-field/form-field.module';
import { FeedbackService } from 'src/app/shared/feedback/feedback.service';
import { Feedback, FeedbackModel } from 'src/app/shared/feedback/feedback.model';

interface Response {
  code: number,
  type: 'error' | 'warning' | 'info',
  message: string,
  contactSubmitted: boolean
}

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
  readonly contactForm = new FormGroup({});
  submitting: boolean = false;
  response!: Response;

  readonly name = new FormControl('', Validators.compose(
    [Validators.required, Validators.maxLength(50), Validators.pattern(this.NAME_REGEX)]
  ));
  readonly email = new FormControl('', Validators.compose(
    [Validators.required, Validators.pattern(this.EMAIL_REGEX), Validators.maxLength(50)]
  ));
  readonly message = new FormControl('', Validators.compose(
    [Validators.required, Validators.maxLength(250)]
  ));

  get isMessageSend() {
    return this.isMessageSubmitted && this.response?.type == 'info';
  }

  get isMessageNotSend() {
    return this.isMessageSubmitted && this.response?.type == 'error';
  }

  get isMessageSubmitted() {
    return !this.submitting && this.response?.contactSubmitted;
  }

  constructor(private http: HttpClient, private feedbackS: FeedbackService) {
    this.contactForm.setControl('name', this.name);
    this.contactForm.setControl('email', this.email);
    this.contactForm.setControl('message', this.message);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitting = true;
    const url = '/sendmail/index.php';
    const formData = new FormData();
    formData.append('name', this.name.value as string);
    formData.append('email', this.email.value as string);
    formData.append('message', this.message.value as string);

    this.http.post(url, formData)
      .subscribe(
        {
          next: response => this.handleResponse(response),
          error: error => this.handleError(error)
        }
      );
  }

  handleResponse(response: any) {
    this.contactForm.disable();
    this.response = { code: 200, type: 'info', message: response.detail, contactSubmitted: true };
    this.handleSubmission();
  }

  handleError(errorResponse: any) {
    const message = errorResponse.code == 400 ? errorResponse.error.detail : "An error occurred while submitting the message.";
    this.response = { code: errorResponse.code, type: 'error', message: message, contactSubmitted: true }
    this.handleSubmission();
  }

  handleSubmission() {
    this.submitting = false;
    const feedback = this.response.code == 400 ? { message: this.response.message, closeFeedbackAction: 'Try Again' } as Feedback : { message: this.response.message } as Feedback;
    this.feedbackS.createNewFeedback(feedback);
  }

  createFeedback(){

  }
}
