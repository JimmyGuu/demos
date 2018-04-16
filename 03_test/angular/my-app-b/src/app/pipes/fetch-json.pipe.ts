import 'rxjs/add/operator/map';
import {Pipe, PipeTransform} from "@angular/core";
import {Http} from "@angular/http";

@Pipe({
  name: 'fetch',
  pure: false
})

export class FetchJsonPipe implements PipeTransform{
  private cachedData: any = null;
  private cachedUrl: string = '';

  constructor(private http: Http) {}

  transform(url: string): any {
    if (url !== this.cachedUrl) {
      this.cachedData = null;
      this.cachedUrl = url;
      this.http.get(url)
        .map(result => result.json())
        .subscribe(result => this.cachedData = result);
    }

    return this.cachedData;
  }
}
