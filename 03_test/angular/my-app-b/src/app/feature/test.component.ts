import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-test',
  template: `
    <h2>Test</h2>
    <p>{{name}}</p>
    <a routerLink="/home" routerLinkActive="active">Home</a>
  `
})

export class TestComponent implements OnInit {
  private name: string;

  constructor() {
    this.name = 'Hehe';
  }

  ngOnInit() {

  }
}
