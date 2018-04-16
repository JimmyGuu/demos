import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ExponentialStrengthPipe } from "./exponential-strength.pipe";
import { FlyingHeroesPipe } from "./flying-heroes.pipe";
import { FlyingHeroesImpurePipe } from "./flying-heroes-impure.pipe";
import { FetchJsonPipe } from "./fetch-json.pipe";

import { PipesComponent } from "./app.component";
import { PowerBoosterComponent } from "./power-booster.component";
import { FlyingHeroesV1Component } from "./flying-heroes-v1.component";
import { HeroAsyncMessageComponent } from "./hero-async-message.component";
import { HeroListComponent } from "./hero-list.component";

import { HeroBirthday2Component } from "./hero-birthday2.component";
import { Routes, RouterModule } from "@angular/router";

const ROUTES: Routes = [
  {
    path: 'pipes',
    component: PipesComponent,
    children: [
      { path: '', component: PipesComponent },
      { path: 'hero-birthday2/:id', component: HeroBirthday2Component, outlet: 'pipe' },
      { path: 'power-booster', component: PowerBoosterComponent, outlet: 'pipe' },
      { path: 'flying-heroes-v1', component: FlyingHeroesV1Component, outlet: 'pipe' },
      { path: 'hero-async-message', component: HeroAsyncMessageComponent, outlet: 'pipe' },
      { path: 'hero-list', component: HeroListComponent, outlet: 'pipe' }
    ]
  }
];

@NgModule({
  declarations: [
    PipesComponent,
    HeroBirthday2Component,
    ExponentialStrengthPipe,
    PowerBoosterComponent,
    FlyingHeroesV1Component,
    FlyingHeroesPipe,
    FlyingHeroesImpurePipe,
    HeroAsyncMessageComponent,
    FetchJsonPipe,
    HeroListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    HttpModule
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})

export class PipesModule { }
