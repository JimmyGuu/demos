import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {states} from "./data-model";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html'
})

export class HeroDetailComponent {
  // heroForm = new FormGroup ({
  //   name: new FormControl()
  // });

  public heroForm: FormGroup;
  public states = states;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    // this.heroForm = this.formBuilder.group({
    //   // [初始值, 验证规则]
    //   name: ['', Validators.required],
    //   street: '',
    //   city: '',
    //   state: '',
    //   zip: '',
    //   power: '',
    //   sidekick: ''
    // })
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        street: '',
        city: '',
        state: '',
        zip: ''
      }),
      power: '',
      sidekick: ''
    })
  }
}
