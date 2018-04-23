import {Component, OnInit} from "@angular/core";
import {DownloaderService} from "./service/downloader.service";

@Component({
  selector: 'app-downloader',
  template: `
    <h3>Downloader</h3>
    <p>{{ contents }}</p>
  `,
  providers: [DownloaderService]
})

export class DownloaderComponent implements OnInit{
  public contents: any;

  constructor(private downloaderService: DownloaderService) { }

  ngOnInit() {
    this.download();
  }

  download() {
    this.downloaderService.getTextFile('assets/textfile.txt')
      .subscribe(results => {
        this.contents = results;
        console.log(results);
      });
  }
}
