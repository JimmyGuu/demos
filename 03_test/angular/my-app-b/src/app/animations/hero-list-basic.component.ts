import {Component, Input, OnInit} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Hero} from "./hero.service";

@Component({
  selector: 'app-hero-list-basic',
  template: `
    <h2>Hero List Basic</h2>
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
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})

export class HeroListBasicComponent implements OnInit{
  @Input() heroes: Hero[];

  constructor() {
    this.heroes = [];
  }

  ngOnInit() {
    const heroes: any[] = [
      { name: 'fucker1', state: 'active' },
      { name: 'fucker2', state: 'inactive' },
      { name: 'fucker3', state: 'inactive' },
      { name: 'fucker4', state: 'inactive' },
      { name: 'fucker5', state: 'inactive' }
    ];

    for (let hero of heroes) {
      this.heroes.push(new Hero(hero.name, hero.state));
    }
  }

}
