///<reference path="../model/config.model.ts"/>
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IConfig} from "../model/config.model";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError, retry} from "rxjs/operators";

@Injectable()
export class ConfigService {
  configUrl = 'assets/config1.json';

  constructor(public http: HttpClient) { }

  public handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${err.error.message}`)
    } else {
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`)
    }

    return new ErrorObservable(`Something bad happend, please try again later.`)
  }

  getConfig() {
    return this.http.get<IConfig>(this.configUrl);
  }

  getConfigRes() {
    return this.http.get<IConfig>(this.configUrl, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
}
