import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FeatureModule } from "./feature/feature.module";

import { AppRoutingModule } from "./app-routing.module";
import { AttributeDirectivesModule } from "./attribute-directives/attribute-directives.module";
import { StructuralDirectivesModule } from "./structural-directives/structural-directives.module";

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FeatureModule,
    AppRoutingModule,
    AttributeDirectivesModule,
    StructuralDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
