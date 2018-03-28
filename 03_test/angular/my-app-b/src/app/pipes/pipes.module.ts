import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {PipesComponent} from "./app.component";

import { HeroBirthday2Component } from "./hero-birthday2.component";
import { Routes, RouterModule } from "@angular/router";

const ROUTES: Routes = [
  {
    path: 'pipes',
    component: PipesComponent,
    children: [
      { path: '', component: PipesComponent },
      { path: 'hero-birthday2/:id', component: HeroBirthday2Component, outlet: 'pipe' }
    ]
  }
];

@NgModule({
  declarations: [
    PipesComponent,
    HeroBirthday2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class PipesModule { }
