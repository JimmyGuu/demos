/*!
 * 父组件与子组件通过本地变量互动
 */

import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';

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

  ngOnInit() {
    this.start();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  // 清除倒计时
  clearTimer() {
    clearTimeout(this.intervalId);
  }

  // 开始
  start() {
    this.countDown();
  }

  // 停止
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  // 倒计时方法
  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) {
          this.seconds = 10;
        }
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}

