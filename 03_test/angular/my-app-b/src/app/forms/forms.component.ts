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
      </ul>
    </nav>
    
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent {

}
