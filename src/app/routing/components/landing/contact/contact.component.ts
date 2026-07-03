import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { afterNextRender, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Observable, switchMap } from 'rxjs';
import { Feedback } from 'src/app/shared/feedback/feedback.model';
import { FeedbackService } from 'src/app/shared/feedback/feedback.service';
import { ContactModule } from './contact.module';

type ContactState = 'opened' | 'sending' | 'send' | 'notSend';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ContactModule],
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);
  private feedbackS = inject(FeedbackService);
  private destroyRef = inject(DestroyRef);

  contactState: ContactState = 'opened';
  captchaUrl = '/sendmail/captcha.php';
  private csrfToken = '';

  // Refresh the captcha before PHP's session gc_maxlifetime (~24 min) expires it
  // server-side; the refresh request itself also keeps the session alive.
  readonly captchaLifetimeSeconds = 600;
  captchaSecondsLeft = this.captchaLifetimeSeconds;

  readonly nameMaxLength = 50;
  readonly emailMaxLength = 50;
  readonly messageMaxLength = 1500;

  readonly contactForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    message: FormControl<string>;
    securityCode: FormControl<string>;
  }>;

  readonly name: FormControl<string>;
  readonly email: FormControl<string>;
  readonly message: FormControl<string>;
  readonly securityCode: FormControl<string>;

  constructor() {
    // Initialize form controls
    this.name = new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(this.nameMaxLength),
    ]) as FormControl<string>;
    this.email = new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(this.emailMaxLength),
    ]) as FormControl<string>;
    this.message = new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(this.messageMaxLength),
    ]) as FormControl<string>;
    this.securityCode = new FormControl<string>('', [Validators.required]) as FormControl<string>;

    // Initialize form group
    this.contactForm = new FormGroup({
      name: this.name,
      email: this.email,
      message: this.message,
      securityCode: this.securityCode,
    });

    // Browser only: the countdown must not run during prerendering.
    afterNextRender(() => {
      interval(1000)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.tickCaptchaCountdown());
    });
  }

  ngOnInit(): void {
    this.contactForm.setControl('name', this.name);
    this.contactForm.setControl('email', this.email);
    this.contactForm.setControl('message', this.message);
    this.contactForm.setControl('securityCode', this.securityCode);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.canSubmit()) {
      this.contactState = 'sending';
      this.postMessage();
    }
  }

  // HTTP requests
  private fetchCsrfToken(): Observable<{ csrfToken: string }> {
    return this.http.get<{ csrfToken: string }>('/sendmail/csrfToken.php');
  }

  private postMessage(): void {
    this.contactForm.disable();
    // Fetch the token right before posting: the session token expires server-side,
    // so a token fetched at page load can be stale by the time the user submits.
    this.fetchCsrfToken()
      .pipe(
        switchMap((response) => {
          this.csrfToken = response.csrfToken;
          const conf = this.postConfiguration();
          return this.http.post<{ detail: string }>(conf.url, conf.body);
        })
      )
      .subscribe({
        next: (response) => this.handleSuccessResponse(response),
        error: (error) => this.handleErrorResponse(error),
      });
  }

  // Response handling
  private handleSuccessResponse(response: { detail: string }): void {
    this.contactState = 'send';
    this.contactForm.reset();
    this.handleSubmission(response.detail);
  }

  private handleErrorResponse(errorResponse: HttpErrorResponse): void {
    this.contactState = 'notSend';
    setTimeout(() => this.contactForm.enable(), 1000);
    const message =
      errorResponse.error.detail ?? errorResponse.error.error ?? 'An error occurred while submitting the message.';
    this.handleSubmission(message);
  }

  private handleSubmission(message: string): void {
    const feedback: Feedback = {
      message,
      closeFeedbackAction: this.contactState === 'notSend' ? 'Try Again' : 'Close',
    };
    this.feedbackS.createNewFeedback(feedback);
    this.refreshCaptcha();
  }

  // Utility methods
  private canSubmit(): boolean {
    return (
      this.contactForm.valid &&
      !this.contactForm.disabled &&
      this.contactState !== 'sending' &&
      this.contactState !== 'send'
    );
  }

  private postConfiguration(): {
    url: string;
    body: FormData;
  } {
    const url = '/sendmail/index.php';
    const body = new FormData();
    body.append('name', this.sanitizeInput(this.name.value || ''));
    body.append('email', this.sanitizeInput(this.email.value || ''));
    body.append('message', this.sanitizeInput(this.message.value || ''));
    body.append('securityCode', this.sanitizeInput(this.securityCode.value || ''));
    body.append('csrfToken', this.csrfToken);

    return { url, body };
  }

  private sanitizeInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ');
  }

  sanitizeControl(control: FormControl): void {
    const sanitizedValue = this.sanitizeInput(control.value || '');
    if (sanitizedValue !== control.value) {
      control.setValue(sanitizedValue, { emitEvent: false });
    }
  }

  refreshCaptcha(): void {
    this.captchaUrl = `/sendmail/captcha.php?${new Date().getTime()}`;
    this.captchaSecondsLeft = this.captchaLifetimeSeconds;
  }

  get captchaCountdown(): string {
    const minutes = Math.floor(this.captchaSecondsLeft / 60);
    const seconds = this.captchaSecondsLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private tickCaptchaCountdown(): void {
    // Never swap the code while a submission is in flight.
    if (this.contactState === 'sending') {
      return;
    }

    this.captchaSecondsLeft--;
    if (this.captchaSecondsLeft <= 0) {
      this.securityCode.reset('');
      this.refreshCaptcha();
    }
  }
}
