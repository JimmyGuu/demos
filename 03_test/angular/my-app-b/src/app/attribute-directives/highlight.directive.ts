/*
 * 属性型指令可以同时绑定多个
 * 结构型指令只能绑定一个
 */

import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[appHighlight]' // 方括号表示属性型选择器
})

export class HighlightDirective {
  @Input() highlightColor: string;

  private el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || '#ff5f00');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
