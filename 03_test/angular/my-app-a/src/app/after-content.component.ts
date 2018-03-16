import {AfterContentChecked, AfterContentInit, Component, ContentChild, OnInit} from "@angular/core";

@Component({
  selector: 'after-content',
  template: `<div>-- projected content begins --</div>
    <ng-content></ng-content>
  <div>-- projected content ends --</div>`
})

export class AfterContentComponent implements OnInit, AfterContentInit, AfterContentChecked {

  constructor () {}

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    console.log('After content init...');
  }

  ngAfterContentChecked(): void {
    // console.log('After content checked...');
  }
}
