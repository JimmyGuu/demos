import {QuestionBase} from "./question-base";

export class QuestionTextbox extends QuestionBase<string>{
  controlType: string = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
