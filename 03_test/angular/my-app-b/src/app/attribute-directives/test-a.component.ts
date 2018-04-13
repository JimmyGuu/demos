import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'test-a',
  template: `
    <div class="test-a">
      <p appHighlight>Highlight</p>
    </div>
    <div class="test-a-2">
      <p appHighlight highlightColor="yellow">Highlighted in yellow</p>
      <p appHighlight [highlightColor]="color">Highlighted in customed</p>
    </div>
  `,
  styles: ['.test-a p, .test-a-2 p { font-size: 1.6rem;padding: 6px 12px; }']
})

export class TestAComponent implements OnInit {
  public color: string;

  constructor() {
    this.color = 'blue';
  }

  ngOnInit() {

  }
}
