import {Injectable} from "@angular/core";
import {QuestionBase} from "./question-base";
import {QuestionDropdown} from "./question-dropdown";
import {QuestionTextbox} from "./question-textbox";

@Injectable()
export class QuestionService {
  getQuestions() {
    let questions: QuestionBase<any>[] = [
      new QuestionDropdown({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),
      new QuestionTextbox({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
      new QuestionTextbox({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
