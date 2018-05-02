import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HeadersInterceptorService} from "./headers-interceptor.service";
import {LoadingInterceptorService} from "./loading-interceptor.service";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptorService,
    multi: true
  }
];
