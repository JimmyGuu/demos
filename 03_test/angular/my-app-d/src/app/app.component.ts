import {Component, OnInit} from '@angular/core';
import {CommonService} from "./service/common.service";
import {BannerService} from "./service/site-show/banner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ CommonService, BannerService ]
})
export class AppComponent implements OnInit{
  constructor(
    private commonService: CommonService,
    private bannerService: BannerService
    ) { }

  ngOnInit() {
    // TODO Post request demo
    this.commonService.TokenApplyAndTime().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )

    // TODO Get request demo
    this.bannerService.banner().subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
