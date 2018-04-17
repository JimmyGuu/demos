import {Component} from "@angular/core";

@Component({
  selector: 'app-keyup',
  template: `
    <input type="text" #text (keyup)="getInput(text.value)">
    <p>{{ value }}</p>
  `
})

export class KeyupComponent {
  private value: string;

  getInput(v: string) {
    this.value = v;
  }
}
