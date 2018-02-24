import { HEROES } from './mock-heroes';
import {Component} from "@angular/core";
import {Hero} from "./hero";

@Component({
  selector: 'app-hero-parent',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes.</h2>
    <app-hero-child *ngFor="let hero of heroes"
        [hero]="hero"
        [master]="master">
    </app-hero-child>
  `
})

export class HeroParentComponent {
  private heroes: Hero[];
  private master: string;

  constructor () {
    this.heroes = HEROES;
    this.master = 'Master';
  }
}

