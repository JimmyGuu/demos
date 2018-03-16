import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SpyComponent } from './spy.component';
import { OnChangesComponent } from './on-changes.component';
import { AfterContentComponent } from "./after-content.component";

import { HeroChildComponent } from "./hero-child.component";
import { HeroParentComponent } from "./hero-parent.component";
import { NameChildComponent } from "./name-child.component";
import { NameParentComponent } from "./name-parent.component";
import { VersionChildComponent } from "./version-child.component";
import { VersionParentComponent } from "./version-parent.component";
import { VoterComponent } from "./voter.component";
import { VotetakerComponent } from "./votetaker.component";
import { CountdownParentComponent } from './countdown-parent.component';
import { CountdownTimerComponent } from './countdown-timer.component';
import { CountdownParentSecondComponent } from './countdown-parent-second.component';
import { MissioncontrolComponent } from './missioncontrol.component';
import { AstronautComponent } from './astronaut.component';

import { LoggerService } from './logger.service';

import { SpyDirective } from './spy.directive';


import { DynamicModule } from "./dynamic-component-loader/dynamic.module";
import {DynamicComponent} from "./dynamic-component-loader/dynamic.component";

export const ROUTES: Routes = [
  { path: '', component: CountdownParentComponent }

];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    DynamicModule
  ],
  declarations: [
    AppComponent,
    SpyComponent,
    SpyDirective,
    OnChangesComponent,
    AfterContentComponent,
    HeroChildComponent,
    HeroParentComponent,
    NameChildComponent,
    NameParentComponent,
    VersionChildComponent,
    VersionParentComponent,
    VoterComponent,
    VotetakerComponent,
    CountdownParentComponent,
    CountdownTimerComponent,
    CountdownParentSecondComponent,
    MissioncontrolComponent,
    AstronautComponent
  ],
  providers: [
    LoggerService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [

  ]
})
export class AppModule { }
