import {TokenData} from "../model/config.model";
import {Utils} from "./utilities.service";
import {Injectable} from "@angular/core";
import {apiData} from "../app.config";
import {CookieService} from "ngx-cookie";

@Injectable()
export class TokenDatasService {
  public tokenData: TokenData = new TokenData(0, '', '');

  constructor(private cookieService: CookieService) {}

  set setTokenData(data: TokenData) {
    this.tokenData.Token = data.Token;
    this.tokenData.DiffTime = data.DiffTime;
    this.tokenData.Time = data.Time;
  }

  get diffTime() {
    return this.tokenData.DiffTime;
  }

  get token() {
    return this.tokenData.Token;
  }

  get timespan() {
    let v = Date.parse(new Date().toString()) + this.diffTime;
    return new Date(parseInt(v.toString()));
  }

  get timespanFormat() {
    return Utils.datetimeFormat(this.timespan, 'yyyy-MM-dd h:m:s');
  }

  public clear() {
    this.cookieService.remove(apiData.TokenAndTime);
  }
}
