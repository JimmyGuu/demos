import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AnimationsComponent} from "./animations.component";
import {HeroListBasicComponent} from "./hero-list-basic.component";
import {HeroListEnterLeaveComponent} from "./hero-list-enter-leave.component";
import {HeroListAutoComponent} from "./hero-list-auto.component";

const ROUTES: Routes = [
  {
    path: 'animations',
    component: AnimationsComponent,
    children: [{
      path: '',
      children: [
        { path: 'hero-list-basic', component: HeroListBasicComponent },
        { path: 'hero-list-enter-leave', component: HeroListEnterLeaveComponent },
        { path: 'hero-list-auto', component: HeroListAutoComponent }
      ]
    }]
  }
];

@NgModule({
  declarations: [
    AnimationsComponent,
    HeroListBasicComponent,
    HeroListEnterLeaveComponent,
    HeroListAutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    CommonModule,
    RouterModule
  ],
  providers: []
})

export class AnimationsRoutingModule { }
