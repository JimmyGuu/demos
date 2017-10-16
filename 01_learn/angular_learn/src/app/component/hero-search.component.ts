import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../service/hero-search.service';
import { Hero } from '../model/hero';

@Component({
	selector: 'hero-search',
	templateUrl: '../template/hero-search.component.html',
	styleUrls: ['../css/hero-search.component.css'],
	providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
	heroes: Observable<Hero[]>;
	private searchTerms = new Subject<string>();

	constructor(
		private heroSearchService: HeroSearchService,
		private router: Router
	) { }

	// Push a search term into the observable stream.
	search(term: string): void {
		console.log(term)
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.heroes = this.searchTerms
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap(term => term
				// return the http search observable
				? this.heroSearchService.search(term)
				// or the ovservable of empty heroes if there was no search term
				: Observable.of<Hero[]>([])
			)
			.catch(error => {
				// TODO: add real error handing
				console.log(error);
				return Observable.of<Hero[]>([]);
			});
	}

	gotoDetail(hero: Hero): void {
		console.log(hero)
		let link = ['/detail', hero.id];
		this.router.navigate(link);
	}
}