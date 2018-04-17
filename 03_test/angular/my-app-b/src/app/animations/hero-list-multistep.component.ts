import {Component} from "@angular/core";
import {HeroListEnterLeaveComponent} from "./hero-list-enter-leave.component";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-hero-list-multistep',
  template: `
    <h2>Hero List Multistep <small>基于关键帧(Keyframes)的多阶段动画</small></h2>
    <button (click)="del()">DEL</button>
    <button (click)="add()">ADD</button>
    <ul>
      <li *ngFor="let hero of heroes"
          [@flyInOut]="hero.state"
          (click)="hero.toggleState()">
        {{ hero.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./hero-list-basic.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('active', style({
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(300, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})

export class HeroListMultistepComponent extends HeroListEnterLeaveComponent{

}
