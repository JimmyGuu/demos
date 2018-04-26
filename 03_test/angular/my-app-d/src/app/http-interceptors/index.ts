import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeadersInterceptorService} from "./headers-interceptor.service";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptorService,
    multi: true
  }
];
