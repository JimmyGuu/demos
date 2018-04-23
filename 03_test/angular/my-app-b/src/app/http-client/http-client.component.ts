import {Component} from "@angular/core";

@Component({
  selector: 'app-http-client',
  template: `
    <h2>Http Client Demo</h2>
    
    <nav>
      <ul>
        <li><a routerLink="./config" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">config</a></li>
        <li><a routerLink="./downloader" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">downloader</a></li>
        <li><a routerLink="./package-search" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">package-search</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})

export class HttpClientDemoComponent {
  constructor() {}
}
