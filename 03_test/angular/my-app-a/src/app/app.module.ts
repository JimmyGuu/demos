import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SpyComponent } from './spy.component';

import { LoggerService } from './logger.service';

import { SpyDirective } from './spy.directive';


@NgModule({
  declarations: [
    AppComponent,
    SpyComponent,
    SpyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    LoggerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
