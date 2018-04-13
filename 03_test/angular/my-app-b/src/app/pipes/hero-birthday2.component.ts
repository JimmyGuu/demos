import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'hero-birthday',
  template: `
    <h4>{{ id }}</h4>
    <p>The hero's birthday is {{ birthday | date:format }}</p>
    <button (click)="toggleFormat()">Toggle Format</button>
  `
})

export class HeroBirthday2Component implements OnInit{
  public birthday: Date;
  public toggle: boolean;
  public id: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.birthday = new Date('1994-05-05');
    this.toggle = true;
  }

  get format() {
    return this.toggle ? 'shortDate' : 'fullDate';
  }

  toggleFormat() {
    this.toggle = !this.toggle;
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return null;
      })
    )
  }
}
