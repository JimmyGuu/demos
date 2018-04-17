import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AnimationsComponent} from "./animations.component";
import {HeroListBasicComponent} from "./hero-list-basic.component";
import {HeroListEnterLeaveComponent} from "./hero-list-enter-leave.component";
import {HeroListAutoComponent} from "./hero-list-auto.component";
import {HeroListTimingComponent} from "./hero-list-timing.component";
import {HeroListMultistepComponent} from "./hero-list-multistep.component";
import {HeroListGroupsComponent} from "./hero-list-groups.component";

const ROUTES: Routes = [
  {
    path: 'animations',
    component: AnimationsComponent,
    children: [{
      path: '',
      children: [
        { path: 'hero-list-basic', component: HeroListBasicComponent },
        { path: 'hero-list-enter-leave', component: HeroListEnterLeaveComponent },
        { path: 'hero-list-auto', component: HeroListAutoComponent },
        { path: 'hero-list-timing', component: HeroListTimingComponent },
        { path: 'hero-list-multistep', component: HeroListMultistepComponent },
        { path: 'hero-list-groups', component: HeroListGroupsComponent }
      ]
    }]
  }
];

@NgModule({
  declarations: [
    AnimationsComponent,
    HeroListBasicComponent,
    HeroListEnterLeaveComponent,
    HeroListAutoComponent,
    HeroListTimingComponent,
    HeroListMultistepComponent,
    HeroListGroupsComponent
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
