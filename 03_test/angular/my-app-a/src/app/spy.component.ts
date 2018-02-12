import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Hero} from './hero';

@Component({
  selector: 'app-spy',
  templateUrl: './spy.component.html'
})

export class SpyComponent implements OnInit {
  heroes: Hero[] = [];
  nextId: number;
  name: string;
  constructor() {
    this.nextId = 1;
  }
  ngOnInit() {}
  addHero() {
    const h = new Hero(this.nextId++, this.name);
    this.heroes.push(h);
  }
  removeHero() {
    this.heroes.splice(this.heroes.length - 1, 1);
  }
  resetHero() {
    this.heroes.splice(0, this.heroes.length);
  }
}

