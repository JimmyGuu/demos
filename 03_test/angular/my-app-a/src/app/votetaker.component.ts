import {Component} from "@angular/core";

@Component({
  selector: 'app-vote-taker',
  template: `
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
    <app-voter *ngFor="let voter of voters"
        [name]="voter"
        (onVoted)="onVoted($event)">
    </app-voter>
  `
})

export class VotetakerComponent {
  private agreed: number;
  private disagreed: number;
  private voters: string[];

  constructor () {
    this.agreed = 0;
    this.disagreed = 0;
    this.voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
  }

  onVoted(isAgreed: boolean) {
    isAgreed ? this.agreed++ : this.disagreed++;
  }
}
