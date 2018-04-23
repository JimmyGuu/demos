import {Component, OnInit} from "@angular/core";
import {QuestionBase} from "./question-base";
import {QuestionService} from "./question.service";

@Component({
  selector: 'app-question-main',
  template: `
    <h3>Dynamic form questions</h3>

    <app-dynamic-form [questions]="questions"></app-dynamic-form>
  `,
  providers: [QuestionService]
})

export class DynamicFormMainComponent implements OnInit {
  public questions: QuestionBase<any>[];

  constructor(private service: QuestionService) {
    this.questions = [];
  }

  ngOnInit(): void {
    this.questions = this.service.getQuestions();
  }
}
