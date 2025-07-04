import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/shared/feedback/feedback.model';
import { FeedbackService } from 'src/app/shared/feedback/feedback.service';
import { ContactModule } from './contact.module';

interface Response {
  code: number;
  type: 'error' | 'warning' | 'info' | 'detail';
  message: string;
  contactSubmitted: boolean;
}

interface ApiResponse {
  detail: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ContactModule],
})
export class ContactComponent {
  private http = inject(HttpClient);
  private feedbackS = inject(FeedbackService);

  readonly NAME_REGEX = /^[A-Za-z .'-]+$/;
  readonly EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  readonly NAME_MAX_LENGTH = 50;
  readonly EMAIL_MAX_LENGTH = 50;
  readonly MESSAGE_MAX_LENGTH = 250;
  readonly contactForm = new FormGroup({});
  submitting = false;
  response!: Response;

  readonly name = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(this.NAME_REGEX)])
  );
  readonly email = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.pattern(this.EMAIL_REGEX), Validators.maxLength(50)])
  );
  readonly message = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(250)]));

  get isMessageSend() {
    return this.isMessageSubmitted && this.response?.type == 'info';
  }

  get isMessageNotSend() {
    return this.isMessageSubmitted && this.response?.type == 'error';
  }

  get isMessageSubmitted() {
    return !this.submitting && this.response?.contactSubmitted;
  }

  constructor() {
    this.contactForm.setControl('name', this.name);
    this.contactForm.setControl('email', this.email);
    this.contactForm.setControl('message', this.message);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.canSubmit) {
      this.contactState = 'sending';
      this.postMessage();
    }
  }

  get canSubmit() {
    return this.contactForm.valid && !this.contactForm.disabled && !this.submitting;
  }

  set contactState(state: 'sending' | 'opened') {
    if (state == 'sending') {
      this.submitting = true;
      this.contactForm.disable();
    }

    if (state == 'opened') {
      this.submitting = false;
      this.contactForm.enable();
    }
  }

  postMessage() {
    const conf = this.postConf;
    this.http.post<ApiResponse>(conf.url, conf.body).subscribe({
      next: (response) => this.handleResponse(response),
      error: (error) => this.handleError(error),
    });
  }

  get postConf() {
    const url = '/sendmail/index.php';
    const body = new FormData();
    body.append('name', this.name.value as string);
    body.append('email', this.email.value as string);
    body.append('message', this.message.value as string);

    return { url, body };
  }

  handleResponse(response: ApiResponse) {
    this.contactForm.reset();
    this.response = {
      code: 200,
      type: 'info',
      message: response.detail,
      contactSubmitted: true,
    };
    this.handleSubmission();
  }

  handleError(errorResponse: HttpErrorResponse) {
    const message =
      errorResponse.status == 400 ? errorResponse.error.detail : 'An error occurred while submitting the message.';
    this.response = {
      code: errorResponse.status,
      type: 'error',
      message: message,
      contactSubmitted: true,
    };
    this.handleSubmission();
  }

  handleSubmission() {
    this.contactState = 'opened';
    const feedback =
      this.response.code == 400
        ? ({
            message: this.response.message,
            closeFeedbackAction: 'Try Again',
          } as Feedback)
        : ({ message: this.response.message } as Feedback);
    this.feedbackS.createNewFeedback(feedback);
  }
}
