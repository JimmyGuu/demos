import {Component, OnInit} from "@angular/core";
import {HeroFormComponent} from "./hero-form.component";
import {Hero} from "./hero-model";

@Component({
  selector: 'app-hero-form-v2',
  templateUrl: './hero-form-template.component.html'
})

export class HeroFormV2Component implements OnInit{
  public powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  private count: number = 1;
  public hero = new Hero(this.count, 'Dr A', this.powers[0], 'Chunk Overstreet');
  public heroes: Hero[] = [];

  ngOnInit() {

  }
}
