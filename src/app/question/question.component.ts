import { Component, OnInit, Input } from '@angular/core';

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
    if(this.nearbyRestaurants) {
      this.allQuestions = Object.keys(this.nearbyRestaurants);
      this.currentQuestion = this.allQuestions[this.currentQuestionIndex];
      if(this.currentQuestion === "") {
        this.currentQuestion = this.allQuestions[++this.currentQuestionIndex];
      }
    }
  }

  onNoClicked() {
    this.currentQuestion = this.allQuestions[++this.currentQuestionIndex];
  }

  get questionDisplay() {
    switch(this.currentQuestion) {
      case 'Cafe': return 'Cafe Food';
      case 'Sandwich': return 'A Sandwich';
      case 'Burger': return 'Burgers';
      default: return this.currentQuestion;
    }
  }

  get isBackShown() {
    return this.currentQuestionIndex !== 0;
  }

  onBackClicked() {
    this.currentQuestion = this.allQuestions[--this.currentQuestionIndex];
  }

  get noQuestions() {
    return this.allQuestions.length === 0 || this.currentQuestionIndex >= this.allQuestions.length;
  }

  get currentQuestionPlaces() {
    return this.nearbyRestaurants[this.currentQuestion];
  }
}
