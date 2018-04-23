import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {debounce, debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-package-search',
  template: `
    <input (keyup)="search($event.target.value)" id="name" placeholder="Search"/>

    <ul>
      <li *ngFor="let package of packages$ | async">
        <b>{{package.name}} v.{{package.version}}</b> -
        <i>{{package.description}}</i>
      </li>
    </ul>
  `
})

export class PackageSearchComponent implements OnInit{
  withRefresh = false;
  // packages$: Observable<NpmPackageInfo[]>;
  packages$: any;
  private searchText$ = new Subject<string>();

  constructor() { }

  search(packageName: string) {
    this.searchText$.next(packageName);
  }

  ngOnInit() {
    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(packageName =>
        this.searchTest(packageName, this.withRefresh))
    )

  }

  searchTest(packageName, withRefresh) {
    let datas = {
      packageName: packageName,
      withRefresh: withRefresh
    };
    console.log(datas);
    const myObservable = new Observable(observer => {
      console.log(observer);
    });

    return myObservable;
  }
}
