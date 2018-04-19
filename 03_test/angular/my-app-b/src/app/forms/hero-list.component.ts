import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Hero} from "./data-model";
import {finalize} from "rxjs/operators";
import {HeroService} from "./hero.service";

@Component({
  selector: 'app-hero-list',
  template: `
    <h3 *ngIf="isLoading">Loading heroes...</h3>
    <h3 *ngIf="!isLoading">Select a hero:</h3>
    
    <nav>
      <button type="button" (click)="getHeroes()" class="btn btn-primary">Refresh</button>
      <a *ngFor="let hero of heroes | async" (click)="select(hero)">{{ hero.name }}</a>
    </nav>
    
    <div *ngIf="selectedHero">
      <hr>
      <h2>Hero Detail</h2>
      <h3>Editing: {{ selectedHero.name }}</h3>
      <app-hero-detail-v2 [hero]="selectedHero"></app-hero-detail-v2>
    </div>
  `,
  styleUrls: ['./hero-list.component.scss']
})

export class HeroListComponent implements OnInit{
  public heroes: Observable<Hero[]>;
  public isLoading: boolean = false;
  public selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroService.getHeroes()
      .pipe(finalize(() => this.isLoading = false));
    this.selectedHero = undefined;
  }

  select(hero: Hero) {
    this.selectedHero = hero;
  }
}
