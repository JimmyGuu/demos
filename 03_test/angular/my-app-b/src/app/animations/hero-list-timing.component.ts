import {Component} from "@angular/core";
import {HeroListEnterLeaveComponent} from "./hero-list-enter-leave.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-hero-list-timing',
  template: `
    <h2>Hero List Timing</h2>
    <button (click)="del()">DEL</button>
    <button (click)="add()">ADD</button>
    <ul>
      <li *ngFor="let hero of heroes"
          [@flyOut]="hero.state"
          (click)="hero.toggleState()">
        {{ hero.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./hero-list-basic.component.scss'],
  animations: [
    trigger('flyOut', [
      state('active', style({
        opacity: 1, transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})

export class HeroListTimingComponent extends HeroListEnterLeaveComponent{

}
