import {Component, Input, OnInit} from "@angular/core";
import {QuestionBase} from "./question-base";
import {FormGroup} from "@angular/forms";
import {QuestionControlService} from "./question-control.service";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})

export class DynamicFormComponent implements OnInit{
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLaod = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    console.log(this.questions, this.form);
  }

  onSubmit() {
    this.payLaod = JSON.stringify(this.form.value);
  }
}
