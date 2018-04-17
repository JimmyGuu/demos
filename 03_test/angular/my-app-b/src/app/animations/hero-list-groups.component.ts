import {Component} from "@angular/core";
import {HeroListEnterLeaveComponent} from "./hero-list-enter-leave.component";
import {animate, group, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-hero-list-groups',
  template: `
    <h2>Hero List Groups <small>并行动画组(Group)</small></h2>
    <button (click)="del()">DEL</button>
    <button (click)="add()">ADD</button>
    <ul>
      <li *ngFor="let hero of heroes"
          (@flyOut.start)="animationStarted($event)"
          (@flyOut.done)="animationDone($event)"
          [@flyOut]="hero.state"
          (click)="hero.toggleState()">
        {{ hero.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./hero-list-basic.component.scss'],
  animations: [
    trigger('flyOut', [
      state('active', style({ width: 120, transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.3s 0.1s ease', style({ transform: 'translateX(0)', width: 120 })),
          animate('0.3s ease', style({ opacity: 1 }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({ transform: 'translateX(50px)', width: 10 })),
          animate('0.3s 0.2s ease', style({ opacity: 0 }))
        ])
      ])
    ])
  ]
})

export class HeroListGroupsComponent extends HeroListEnterLeaveComponent {
  animationStarted(e) {
    console.log('animation started...', e);
  }
  animationDone(e) {
    console.log('animation done...', e);
  }
}
