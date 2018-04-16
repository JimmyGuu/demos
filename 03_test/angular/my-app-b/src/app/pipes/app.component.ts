import {Component, HostBinding} from "@angular/core";

import { slideInDownAnimation } from "../animations";

@Component({
  selector: 'app-pipes',
  template: `
    <p>The hero's birthday is {{ birthday | date:'yyyy-MM-dd' }}</p>
    <nav>
      <ul>
        <li><a [routerLink]="[{ outlets: { pipe: ['hero-birthday2', id] }}]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-birthday2</a></li>
        <!--<li><a [routerLink]="['./hero-birthday2', id]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-birthday2</a></li>-->
        <li><a [routerLink]="[{ outlets: { pipe: ['power-booster'] } }]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">power-booster</a></li>
        <li><a [routerLink]="[{ outlets: { pipe: ['flying-heroes-v1'] } }]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">flying-heroes-v1</a></li>
        <li><a [routerLink]="[{ outlets: { pipe: ['hero-async-message'] } }]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-async-message</a></li>
        <li><a [routerLink]="[{ outlets: { pipe: ['hero-list'] } }]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">hero-list</a></li>
      </ul>
    </nav>
    <router-outlet name="pipe"></router-outlet>
  `,
  animations: [slideInDownAnimation]
})

export class PipesComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  public birthday: Date;
  public id: number = 12;

  constructor() {
    this.birthday = new Date('2000-12-12');
  }
}
