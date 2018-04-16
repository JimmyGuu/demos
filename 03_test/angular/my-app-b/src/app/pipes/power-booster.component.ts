import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-power-booster',
  template: `
    <h2>Power Booster</h2>
    <p><input type="text" [(ngModel)]="power"></p>
    <p><input type="text" [(ngModel)]="exp"></p>
    <p>Super power boost({{ power }}^{{ exp }}): {{ power | exponentialStrength: exp }}</p>
  `
})

export class PowerBoosterComponent implements OnInit{
  @Input() exp: number | string;
  @Input() power: number | string;

  constructor() {
    this.power = 2;
    this.exp = 1;
  }

  ngOnInit() {

  }
}
