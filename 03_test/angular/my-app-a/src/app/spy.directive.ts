///<reference path="../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Directive, NgModule, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from './logger.service';

@Directive({selector: '[appSpy]'})
export class SpyDirective implements OnInit, OnDestroy {
  private nextId: number;
  constructor(private logger: LoggerService) {
    this.nextId = 1;
  }
  ngOnInit() {
    this.logIt(`onInit`);
  }
  ngOnDestroy() {
    this.logIt(`onDestroy`);
  }
  private logIt(msg: string) {
    this.logger.log(`Spy #${this.nextId++} ${msg}`);
  }
}



