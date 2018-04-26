import {Component, OnInit} from '@angular/core';
import {InitDataService} from "./service/data-init.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit{
  constructor(
    private baseData: InitDataService
  ) {

  }

  ngOnInit() {
    // console.log(this.baseData.getToken, this.baseData.getDiffTime);

  }
}
