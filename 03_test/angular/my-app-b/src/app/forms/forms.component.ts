import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-forms',
  template: `
    <h1>Angular表单</h1>
    <nav>
      <ul>
        <li><a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">forms-index</a></li>
        <li><a routerLink="./hero-form" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-form</a></li>
        <li><a routerLink="./hero-form-v2" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-form-v2</a></li>
        <li><a routerLink="./hero-form-v3" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-form-v3</a></li>
        <li><a routerLink="./hero-detail" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-detail</a></li>
      </ul>
    </nav>
    
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent {

}
