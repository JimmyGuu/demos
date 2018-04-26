import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie";
import {apiData} from "../app.config";
import {CommonService} from "./common.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {TokenDatasService} from "./data-store.service";
import {Utils} from "./utilities.service";
import {ResponseModel} from "../model/response.model";

/**
 * Token And Time Init
 * @depend CommonService
 */
@Injectable()
export class InitDataService {
  private tokenKey: string; // tokenAndTime cookie key-name

  constructor(
    private cookieService: CookieService,
    private commonService: CommonService,
    private tokenDatasService: TokenDatasService
  ) {
    this.tokenKey = apiData.TokenAndTime;
  }

  public tokenAndTime() {
    console.warn('Get token started...');
    const tokenAndTime = this.cookieService.get(this.tokenKey);
    if (!tokenAndTime) {
      // 同步请求
      Utils.xmlHttpRequest(`${apiData.ServiceUrl}Token/ApplyAndTime`, {}, 'POST', false)
        .subscribe(
          response => {
            let obj: ResponseModel = JSON.parse(response);
            if (obj && obj.ResultCode == '0') {
              const data = obj.Data;
              const diffTime = Date.parse(data.Time) - Date.parse(new Date().toString());
              data.DiffTime = diffTime;
              this.cookieService.put(this.tokenKey, JSON.stringify(data), { path: '/' });
              this.tokenDatasService.setTokenData = data;
            }
          }
        );
      // 异步请求
      // this.commonService.TokenApplyAndTime().subscribe(
      //   data => {
      //     const diffTime = Date.parse(data.Time) - Date.parse(new Date().toString());
      //     data.DiffTime = diffTime;
      //     this.cookieService.put(this.tokenKey, JSON.stringify(data), { path: '/' });
      //     this.tokenDatasService.setTokenData = data;
      //
      //     return Observable.of(this.tokenDatasService.tokenData);
      //   }
      // );
    } else {
      const tokenObj = JSON.parse(this.cookieService.get(this.tokenKey));
      console.warn('From cookie: ', tokenObj);
      this.tokenDatasService.setTokenData = tokenObj;
    }

    return Observable.of(this.tokenDatasService.tokenData);
  }

  public clear() {
    this.cookieService.remove(apiData.TokenAndTime);
  }
}
