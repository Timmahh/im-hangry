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

  allQuestions: string[];

  constructor() { }

  ngOnInit() {
    this.allQuestions = _.keys(this.nearbyRestaurants);
    this.currentQuestion = this.allQuestions[this.currentQuestionIndex];
    if(this.currentQuestion === "") {
      this.currentQuestion = this.allQuestions[++this.currentQuestionIndex];
    }
  }

  onNoClicked() {
    this.currentQuestion = this.allQuestions[++this.currentQuestionIndex];
  }

  get currentQuestionPlaces() {
    return this.nearbyRestaurants[this.currentQuestion];
  }
}
