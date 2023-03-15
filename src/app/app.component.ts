import { Component } from '@angular/core';
import { Feedback, FeedbackModel } from './shared/feedback/feedback.model';
import { FeedbackService } from './shared/feedback/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-portfolio';

  constructor(private feedbackS: FeedbackService) { }

  get feedbacks() {
    return this.feedbackS.feedbacks;
  }

  closeFeedback(index: number) {
    this.feedbackS.close(index);
  }
}
