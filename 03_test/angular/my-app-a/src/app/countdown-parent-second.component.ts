/*!
* @ViewChild
*/

///<reference path="../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CountdownTimerComponent} from './countdown-timer.component';

@Component({
  selector: 'app-countdown-parent-second',
  template: `
    <div>
      <h3>Countdown to Liftoff (via ViewChild)</h3>
      <button (click)="start()">Start</button>
      <button (click)="stop()">Stop</button>
      <div class="seconds">{{ seconds() }}</div>
      <div class="theme-orange">
        <app-countdown-timer></app-countdown-timer>
      </div>
    </div>
  `
})

export class CountdownParentSecondComponent implements AfterViewInit {
  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;
  seconds() {
    return 0;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.seconds = () => this.timerComponent.seconds;
    }, 0);
  }
  start() {
    this.timerComponent.start();
  }
  stop() {
    this.timerComponent.stop();
  }
}

