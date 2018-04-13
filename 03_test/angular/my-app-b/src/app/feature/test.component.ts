import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-test',
  template: `
    <h2>Test</h2>
    <p>{{name}}</p>
    <a routerLink="/" routerLinkActive="active">Home</a>
  `
})

export class TestComponent implements OnInit {
  public name: string;

  constructor() {
    this.name = 'Hehe';
  }

  ngOnInit() {

  }
}
