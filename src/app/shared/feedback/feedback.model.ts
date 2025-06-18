export interface Feedback {
  message: string;
  isOpened?: boolean;
  closeFeedbackAction?: string;
}

export class FeedbackModel {
  message: string;
  isOpened: boolean;
  closeFeedbackAction: string;

  constructor(feedback?: Feedback) {
    this.message = feedback?.message ?? '';
    this.isOpened = feedback?.isOpened ?? true;
    this.closeFeedbackAction = feedback?.closeFeedbackAction ?? 'Close';
  }
}
