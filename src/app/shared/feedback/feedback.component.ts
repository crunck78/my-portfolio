import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedbackModel } from './feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @Input() feedback!: FeedbackModel;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get closeFeedbackAction(){
    return this.feedback.closeFeedbackAction;
  }

  get feedbackMessage(){
    return this.feedback.message;
  }

}
