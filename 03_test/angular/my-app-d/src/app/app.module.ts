import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';


import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Ajax} from "./service/ajax.service";
import {AppRoutingModule} from "./app-routing.module";
import {CookieModule, CookieService} from "ngx-cookie";
import {CommonService} from "./service/common.service";
import {InitDataService} from "./service/data-init.service";
import {TokenDatasService} from "./service/data-store.service";
import {httpInterceptorProviders} from "./http-interceptors";


export function loadToken(tokenService: InitDataService) {
  return () => tokenService.tokenAndTime();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    LoadingBarHttpClientModule
  ],
  providers: [
    Ajax, // Async http request
    CookieService,
    CommonService, // Token and time api
    InitDataService, // Global var request&init
    TokenDatasService, // Token server-datetime
    {
      provide: APP_INITIALIZER,
      useFactory: loadToken,
      deps: [InitDataService],
      multi: true
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
