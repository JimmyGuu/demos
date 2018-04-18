import {Component} from "@angular/core";
import {Hero} from "./hero-model";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html'
})

export class HeroFormComponent {
  public powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  private count: number = 1;
  public model = new Hero(this.count, 'Dr IQ', this.powers[0], 'Chunk Overstreet');
  public heroes: Hero[] = [];

  onSubmit(form) {
    this.heroes.push(this.model);
    this.count++;
    this.model = new Hero(this.count, '', '');
    form.reset();
    console.log(this.heroes);
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
