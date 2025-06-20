import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedbackModel } from './feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  @Input() feedback!: FeedbackModel;
  @Output() feedbackClose = new EventEmitter();

  get closeFeedbackAction() {
    return this.feedback?.closeFeedbackAction;
  }

  get feedbackMessage() {
    return this.feedback?.message;
  }
}
