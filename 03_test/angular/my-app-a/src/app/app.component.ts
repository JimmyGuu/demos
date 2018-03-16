import {AfterViewChecked, AfterViewInit, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {Hero} from "./hero";
import {OnChangesComponent} from "./on-changes.component";
import './app.component.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked, AfterViewInit, OnInit{
  title = 'app';
  public hero: Hero;
  public power: string;

  public prevName = '';
  public comment = '';

  @ViewChild(OnChangesComponent) viewChild: OnChangesComponent;
  // @ContentChild(OnChangesComponent) onChangesComponent: OnChangesComponent;

  constructor () {
    this.hero = new Hero(7, 'Bob');
    this.power = 'fly';
  }

  ngOnInit() {
    console.warn('ng on init...');
    // console.log('onChangesComponent: ', this.onChangesComponent);
  }

  ngAfterViewChecked() {
    // console.log('after view checked...');
    if (this.prevName === this.viewChild.name) {
      // console.warn('AfterViewChecked (no changes)');
    } else {
      this.prevName = this.viewChild.name;
      // console.warn('AfterViewChecked');
      this.doSomething();
    }
  }

  ngAfterViewInit() {
    console.log('after view init...');
    console.log(this.viewChild);
    this.doSomething();
  }

  private doSomething() {
    const c = this.viewChild.name.length > 10 ? 'That\'s a long name' : '';
    if (c !== this.comment) {
      // 必须异步更新
      // Angular的“单向数据流”规则禁止在一个视图已经被组合好之后再更新视图。
      setTimeout(() => {
        this.comment = c;
      }, 0);

    }
  }
}
