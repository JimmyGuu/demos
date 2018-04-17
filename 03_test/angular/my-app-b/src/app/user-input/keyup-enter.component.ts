import {Component} from "@angular/core";
import {KeyupComponent} from "./keyup.component";

@Component({
  selector: 'app-keyup-enter',
  template: `
    <P>Input then press enter</P>
    <input type="text" #text (keyup.enter)="getInput(text.value)">
    <p>{{ value }}</p>
  `
})

export class KeyupEnterComponent extends KeyupComponent{

}
