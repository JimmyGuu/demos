/*!
 * 父组件与子组件通过本地变量互动
 */

import {Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: 'app-countdown-timer',
  template: `
    <p>{{message}}</p>
  `
})

export class CountdownTimerComponent implements OnInit, OnDestroy {
  intervalId = 0;
  message = '';
  seconds = 11;

  clearTimer() {
    clearTimeout(this.intervalId);
  }

  ngOnInit() {
    this.start();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private countDown() {

  }
}
