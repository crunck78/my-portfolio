import { Injectable } from '@angular/core';
import { Feedback, FeedbackModel } from './feedback.model';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacks: FeedbackModel[] = [];
  constructor() {}

  createNewFeedback(newFeedback: Feedback) {
    this.feedbacks.push(new FeedbackModel(newFeedback));
  }

  close(feedbackIndex: number) {
    this.feedbacks.splice(feedbackIndex, 1);
  }
}
