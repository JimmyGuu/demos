///<reference path="../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Directive, NgModule, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from './logger.service';

let id = 1;

@Directive({selector: '[appSpy]'})
export class SpyDirective implements OnInit, OnDestroy {
  // private nextId: number;
  constructor(private logger: LoggerService) {
    // 构造函数中对局部变量进行初始化
    // this.nextId = 1;
  }
  ngOnInit() {
    // 在构造函数之后马上执行复杂的初始化逻辑
    // 在Angular设置完输入属性之后，对该组件进行准备
    // 是组件获取初始数据的好地方
    this.logIt(`onInit`);
  }
  ngOnDestroy() {
    this.logIt(`onDestroy`);
  }
  private logIt(msg: string) {
    this.logger.log(`Spy #${id++} ${msg}`);
  }
}



