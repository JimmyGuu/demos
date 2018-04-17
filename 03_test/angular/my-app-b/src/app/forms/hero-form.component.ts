import {Component} from "@angular/core";
import {Hero} from "./hero-model";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html'
})

export class HeroFormComponent {
  public powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  public model = new Hero(18, 'Dr IQ', this.powers[0], 'Chunk Overstreet');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
