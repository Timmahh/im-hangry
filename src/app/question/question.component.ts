import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentQuestion: string;
  currentQuestionIndex: number = 0;
  @Input() nearbyRestaurants: any;

  allQuestions: any;

  constructor() { }

  ngOnInit() {
    this.allQuestions = _.keys(this.nearbyRestaurants);
    this.currentQuestion = this.allQuestions[this.currentQuestionIndex];
  }

  onNoClicked() {
    this.currentQuestion = this.allQuestions[++this.currentQuestionIndex];
  }

}
