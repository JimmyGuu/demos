import {Component, OnInit} from "@angular/core";
import {CommonService} from "../../service/common.service";
import {BannerService} from "../../service/site-show/banner.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [CommonService, BannerService]
})

export class IndexComponent implements OnInit{
  constructor(private commonService: CommonService, private bannerService: BannerService) { }

  ngOnInit() {
    this.commonService.ImageCode().subscribe(
      data => {
        console.log(data);
      }
    );

    this.bannerService.banner().subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
