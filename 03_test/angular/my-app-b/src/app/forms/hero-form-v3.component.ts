import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Hero} from "./hero-model";
import {forbiddenNameValidator} from "./forbidden-name.directive";

@Component({
  selector: 'app-hero-form-v3',
  templateUrl: './hero-form-template-v3.component.html'
})

export class HeroFormV3Component implements OnInit{
  public powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  public heroForm: FormGroup;
  public model = new Hero(1, 'Dr IQ', this.powers[0], 'Chunk Overstreet');

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      'name': new FormControl(this.model.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bbbb/i)
      ]),
      'alterEgo': new FormControl(this.model.alterEgo),
      'power': new FormControl(this.model.power, Validators.required)
    })
  }

  get name() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }
}
