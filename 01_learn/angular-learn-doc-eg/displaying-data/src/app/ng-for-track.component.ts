import { Component, OnInit, Input, Output } from '@angular/core';

import { Hero } from './hero';

@Component({
	selector: 'ng-for-track',
	templateUrl: './ng-for-track.component.html',
	styles: [
		`.ng-for-tranck { padding: 5px 10px;border: 1px solid #333;border-radius: 4px;margin-bottom: 10px; }
		 .ng-for-h { margin: 0 5px; }`
	]
})
export class NgForTrack implements OnInit {
	constructor() { }

	@Input() heroes: Array<Hero> = [];
	@Input() isTrackBy: boolean = false;
	counts: number = 0;
	newHeroes: Array<Hero> = [];

	trackByHeroes(index: number, hero: Hero): number {
		return hero.id;
	}

	resetHeroes(): void {
		let oldHeores: Array<Hero> = [];
		this.newHeroes.forEach(hero => {
			oldHeores.push(hero);
		});
		this.newHeroes.length = 0;
		oldHeores.forEach((hero, index) => {
			let newHero: Hero = new Hero(hero.id, hero.name);
			this.newHeroes.push(newHero);
		});
	}

	changeIds(): void {
		this.newHeroes.length = 0;
		this.heroes.forEach((hero, index) => {
			this.counts++;
			let newHero: Hero = new Hero(+(this.counts + '' + (index + 1)), hero.name);
			this.newHeroes.push(newHero);
		});
	}

	clearCounts(): void {
		this.counts = 0;
		this.newHeroes.forEach((hero, index) => {
			let newHero: Hero = new Hero(+(this.counts + '' + index), hero.name);
			hero.id = newHero.id;
		});
	}

	ngOnInit() {
		// 初始化newHeroes
		this.heroes.forEach(hero => {
			this.newHeroes.push(hero);
		});
	}
}
