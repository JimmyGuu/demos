import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'structural-directives',
  template: `
    <div class="structural-directives">
      <div>
        <p [style.display]="'block'">display block</p>
        <p [style.display]="'none'">display none</p>
      </div>
      <div>
        <p *ngIf="true">
          Expression is true and ngIf is true.
          This paragraph is in the DOM.
        </p>
        <p *ngIf="false">
          Expression is false and ngIf is false.
          This paragraph is not in the DOM.
        </p>
      </div>
      <div [ngSwitch]="hero?.emotion">
        <ng-template [ngSwitchCase]="'happy'">
          case happy
        </ng-template>
        <ng-template [ngSwitchCase]="'sad'">
          case sad
        </ng-template>
        <ng-template ngSwitchDefault>
          case default
        </ng-template>
      </div>
      <div>
        <input type="checkbox" checked (change)="showSad = !showSad"> Show Sad
        <select name="selector" [(ngModel)]="selected">
          <ng-container *ngFor="let h of heroes">
            <ng-container *ngIf="showSad || h.emotion !== 'sad'">
              <option [ngValue]="h.id">{{h.name}} - {{h.emotion}}</option>
            </ng-container>
          </ng-container>
        </select>
      </div>
      <div>
        <p *myUnless="true">myUnless directive true</p>
        <p *myUnless="false">myUnless directive false</p>
      </div>
    </div>
  `
})

export class TestBComponent implements OnInit{
  public hero: Hero;
  public heroes: Hero[];
  public showSad: boolean;
  public selected: Hero;

  constructor() {
    this.showSad = true;
    this.hero = new Hero(101, 'Bob', 'happy');
    this.heroes = [];

  }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      let hero = new Hero(i, `hero-${i + 1}`, `happy`);
      if (i % 2 == 0) {
        hero.emotion = 'sad';
      }
      this.heroes.push(hero)
    }
  }
}

class Hero {
  constructor(
    public id: number,
    public name: string,
    public emotion: string) { }
}
