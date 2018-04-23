import {Component, Input} from "@angular/core";
import {QuestionBase} from "./question-base";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})

export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
