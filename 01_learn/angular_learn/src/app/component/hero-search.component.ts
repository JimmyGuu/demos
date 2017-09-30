import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable.of';

// Observable operators
import 'rxjs/add/oprator/catch';
import 'rxjs/add/oprator/debounceTime';
import 'rxjs/add/oprator/distinctUntilChanged';

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
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.heroes = this.searchTerms
			.debounceTime(300)
			.distinctUntilChange()
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
		let link = ['/detail', hero.id];
		this.router.navigate
	}
}