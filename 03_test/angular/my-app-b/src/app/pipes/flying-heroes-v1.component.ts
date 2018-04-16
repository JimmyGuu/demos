import {Component} from "@angular/core";

const HEROES: any[] = [{
  name: 'demo1',
  canfly: true
}];

@Component({
  selector: 'app-flying-heroes',
  template: `
    New Hero: 
    <p><input type="text" #box (keyup.enter)="addHero(box.value); box.value=''" placeholder="输入并按回车添加"></p>
    <button (click)="reset()">Reset</button>
    <div *ngFor="let hero of (heroes | flyingHeroesImpure)">
      {{ hero.name }}
    </div>
  `
})

export class FlyingHeroesV1Component {
  public heroes: any[] = [];
  public canfly: boolean = true;

  constructor() {
    this.reset();
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) return;
    let hero = { name: name, canfly: this.canfly };
    console.log(hero);
    this.heroes.push(hero);
  }

  reset() {
    this.heroes = HEROES.slice();
  }
}
