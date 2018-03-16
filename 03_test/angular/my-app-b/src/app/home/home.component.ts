import {Component} from "@angular/core";

@Component({
  selector: 'app-home',
  template: `
    <h1>This is home!</h1>
    <a routerLink="/test" routerLinkActive="active">Test</a>
  `
})

export class HomeComponent {}
