import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {Ajax} from "./service/ajax.service";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    Ajax
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
