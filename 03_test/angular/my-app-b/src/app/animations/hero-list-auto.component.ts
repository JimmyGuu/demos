import {Component} from "@angular/core";
import {HeroListEnterLeaveComponent} from "./hero-list-enter-leave.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-hero-list-auto',
  template: `
    <h2>Hero List Auto</h2>
    <button (click)="del()">DEL</button>
    <button (click)="add()">ADD</button>
    <ul>
      <li *ngFor="let hero of heroes"
          [@shrinkOut]="hero.state"
          (click)="hero.toggleState()">
        {{ hero.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./hero-list-basic.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('active', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
      ])
    ])
  ]
})

export class HeroListAutoComponent extends HeroListEnterLeaveComponent{

}
