import {Component, OnInit} from "@angular/core";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [CommonService]
})

export class IndexComponent implements OnInit{
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.ImageCode().subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
