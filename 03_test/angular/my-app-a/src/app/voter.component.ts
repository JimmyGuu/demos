/*!
 * 父组件监听子组件的事件
 * @Output() [name] = new EventEmitter<[data type]>(); // 设置输出属性
 * this.[name].emit([data]); // 触发
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'app-voter',
  template: `
    <h4>{{name}}</h4>
    <button (click)="vote(true)" [disabled]="voted">Agree</button>
    <button (click)="vote(false)" [disabled]="voted">Disagree</button>
  `
})

export class VoterComponent {
  @Input() name: string;
  @Output() onVoted = new EventEmitter<boolean>();

  private voted: boolean;

  constructor () {
    this.voted = false;
  }

  vote(isAgree: boolean) {
    this.onVoted.emit(isAgree);
    this.voted = true;
  }
}
