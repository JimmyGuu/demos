import {Component, NgModule, OnInit} from "@angular/core";
import {AdItem} from "./ad-item";
import {AdService} from "./ad.service";

@Component({
  selector: 'app-dynamic',
  template: `
    <div>
      <ad-banner [ads]="ads"></ad-banner>
    </div>
  `
})

export class DynamicComponent implements OnInit{
  private ads: AdItem[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}


