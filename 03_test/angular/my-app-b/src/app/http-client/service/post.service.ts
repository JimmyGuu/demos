import {Injectable} from "@angular/core";
import {Hero} from "../../forms/data-model";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable()
export class PostService {
  public heroesUrl: string = 'api/data';

  constructor(public http: HttpClient) { }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(err) {
    console.warn(err);
    return new ErrorObservable(`Something bad happend, please try again later.`)
  }
}
