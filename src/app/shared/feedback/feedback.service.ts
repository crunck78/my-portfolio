import { Injectable } from '@angular/core';
import { Feedback, FeedbackModel } from './feedback.model';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacks: FeedbackModel[] = [];
  constructor() {
    this.feedbacks.push(new FeedbackModel({ closeFeedbackAction: 'Try Again', message: "This is a test!" }));
    this.feedbacks.push(new FeedbackModel({ message: "This is a test 2!" }));
    this.feedbacks.push(new FeedbackModel({ message: "This is a test 3!" }));
  }

  createNewFeedback(newFeedback: Feedback) {
    this.feedbacks.push(new FeedbackModel(newFeedback));
  }

  close(feedbackIndex: number) {
    this.feedbacks.splice(feedbackIndex, 1);
  }
}
