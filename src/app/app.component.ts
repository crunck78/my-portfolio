import { Component, inject } from '@angular/core';
import { FeedbackService } from './shared/feedback/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  feedbackService = inject(FeedbackService);


  get feedbacks() {
    return this.feedbackService.feedbacks;
  }

  closeFeedback(index: number) {
    this.feedbackService.close(index);
  }
}
