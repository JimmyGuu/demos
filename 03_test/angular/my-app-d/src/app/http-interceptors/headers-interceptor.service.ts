import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {InitDataService} from "../service/data-init.service";
import {apiData} from "../app.config";

@Injectable()
export class HeadersInterceptorService implements HttpInterceptor {
  private retryCount: number = 0;

  constructor(private initDataService: InitDataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    // Set request Content-Type
    const authReq = req.clone({ setHeaders: { 'Content-Type': apiData.ContentType } });

    return next.handle(authReq);
  }
}
