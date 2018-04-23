import {NgModule} from "@angular/core";
import {HttpClientDemoRoutingModule} from "./http-client-routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpClientDemoRoutingModule
  ],
  exports: [],
  providers: []
})

export class HttpClientDemoModule { }
