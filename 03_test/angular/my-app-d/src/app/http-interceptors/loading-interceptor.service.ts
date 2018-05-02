import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {apiData} from "../app.config";
import {loadingOver} from "../service/utilities.service";
import {finalize} from "rxjs/operators";

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor{
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isShowLoading: boolean = false;
    if (req.body && req.body[apiData.IsShowLoading]) {
      isShowLoading = !!req.body[apiData.IsShowLoading] === true ? true : false;
      if (isShowLoading) {
        loadingOver.show();
      }
    }

    return next.handle(req)
      .pipe(
        finalize(() => {
          if (isShowLoading) {
            loadingOver.hide();
          }
        })
      )
  }
}
