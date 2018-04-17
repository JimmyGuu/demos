import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FeatureModule } from "./feature/feature.module";

import { AppRoutingModule } from "./app-routing.module";
import { AttributeDirectivesModule } from "./attribute-directives/attribute-directives.module";
import { StructuralDirectivesModule } from "./structural-directives/structural-directives.module";
import { PipesModule } from "./pipes/pipes.module";
import { AdminModule } from "./admin/admin.module";

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import { NotFoundComponent } from "./not-found.component";
import {AnimationsModule} from "./animations/animations.module";
import {UserInputModule} from "./user-input/user-input.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FeatureModule,
    AttributeDirectivesModule,
    StructuralDirectivesModule,
    PipesModule,
    AdminModule,
    AppRoutingModule,
    AnimationsModule,
    UserInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
