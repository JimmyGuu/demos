import {Component} from '@angular/core';

import { Observable } from 'rxjs';

import "rxjs/add/observable/interval";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-hero-message',
  template: `
    <h2>Async Hero Message and AsyncPipe</h2>
    <p>Message: {{ message$ | async }}</p>
    <button (click)="resend()">Resend</button>
  `
})

export class HeroAsyncMessageComponent {
  public message$: Observable<string>;

  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];

  constructor() {
    this.resend();
  }

  resend() {
    this.message$ = Observable.interval(1000)
      .map(i => this.messages[i])
      .take(this.messages.length);
  }
}
