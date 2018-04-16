import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-animations',
  template: `
    <h1>This animations component.</h1>
    <nav>
      <ul>
        <li><a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">animations-index</a></li>
        <li><a routerLink="./hero-list-basic" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">hero-list-basic</a></li>
        <li><a routerLink="./hero-list-enter-leave" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">hero-list-enter-leave</a></li>
        <li><a routerLink="./hero-list-auto" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">hero-list-auto</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})

export class AnimationsComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }
}
