import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Input} from "@angular/core";
import {Hero} from "./hero";

@Component({
  selector: 'on-changes',
  templateUrl: './on-changes.component.html'
})

export class OnChangesComponent implements OnInit, OnChanges {
  public changeLog: string[];
  public name: string = 'Bob2';

  @Input() hero: Hero;
  @Input() power: string;

  constructor () {
    this.changeLog = [];
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this);
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue - ${cur}, previousValue - ${prev}`);
    }
  }
}
