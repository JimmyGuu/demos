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
        <li><a routerLink="./hero-list-timing" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">hero-list-timing</a></li>
        <li><a routerLink="./hero-list-multistep" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">hero-list-multistep</a></li>
        <li><a routerLink="./hero-list-groups" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">hero-list-groups</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
    
    <div class="description">
      <p>进场 <code>void => *</code></p>
      <p>离场 <code>* => void</code></p>
    </div>
  `
})

export class AnimationsComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }
}
