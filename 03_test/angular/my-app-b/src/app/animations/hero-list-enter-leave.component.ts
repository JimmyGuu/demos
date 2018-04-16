import {Component} from "@angular/core";
import {HeroListBasicComponent} from "./hero-list-basic.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Hero} from "./hero.service";

@Component({
  selector: 'app-hero-list-enter-leave',
  template: `
    <h2>Hero List Enter Leave</h2>
    <button (click)="del()">DEL</button>
    <button (click)="add()">ADD</button>
    <ul>
      <li *ngFor="let hero of heroes"
          [@heroState]="hero.state"
          (click)="hero.toggleState()">
        {{ hero.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./hero-list-basic.component.scss'],
  animations: [
    trigger('heroState', [
      state('inactive', style({transform: 'translateX(0) scale(1)'})),
      state('active',   style({transform: 'translateX(0) scale(1.1)'})),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({transform: 'translateX(-100%) scale(1)'}),
        animate(100)
      ]),
      transition('inactive => void', [
        animate(100, style({transform: 'translateX(100%) scale(1)'}))
      ]),
      transition('void => active', [
        style({transform: 'translateX(0) scale(0)'}),
        animate(200)
      ]),
      transition('active => void', [
        animate(200, style({transform: 'translateX(0) scale(0)'}))
      ])
    ])
  ]
})

export class HeroListEnterLeaveComponent extends HeroListBasicComponent {
  private deleted: Hero[] = [];

  del() {
    if (!this.heroes.length) return;
    let index = this.heroes.length - 1;
    this.deleted.unshift(this.heroes[index]);
    this.heroes.splice(index, 1);
  }
  add() {
    if (!this.deleted.length) return;
    this.heroes.push(this.deleted[0]);
    this.deleted.splice(0, 1);
  }
}
