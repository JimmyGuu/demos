import {QuestionBase} from "./question-base";

export class QuestionDropdown extends QuestionBase<string> {
  controlType: string = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
