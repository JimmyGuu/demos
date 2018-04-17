import {Component} from "@angular/core";

@Component({
  selector: 'app-user-input',
  template: `
    <h1>用户输入.</h1>

    <nav>
      <ul>
        <li><a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">user-input-index</a></li>
        <li><a routerLink="./keyup" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">keyup</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})

export class UserInputComponent {
  constructor() { }
}
