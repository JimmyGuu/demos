import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsComponent} from "./forms.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeroFormComponent} from "./hero-form.component";
import {HeroFormV2Component} from "./hero-form-v2.component";
import {HeroFormV3Component} from "./hero-form-v3.component";
import {ForbiddenValidatorDirective} from "./forbidden-name.directive";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroListComponent} from "./hero-list.component";
import {HeroDetailV2Component} from "./hero-detail-v2.component";
import {DynamicFormMainComponent} from "./dynamic-form-main.component";
import {DynamicFormComponent} from "./dynamic-form.component";
import {DynamicFormQuestionComponent} from "./dynamic-form-question.component";

const ROUTES: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [{
      path: '',
      children: [
        { path: 'hero-form', component: HeroFormComponent },
        { path: 'hero-form-v2', component: HeroFormV2Component },
        { path: 'hero-form-v3', component: HeroFormV3Component },
        { path: 'hero-detail', component: HeroDetailComponent },
        { path: 'hero-list', component: HeroListComponent },
        { path: 'questions', component: DynamicFormMainComponent }
      ]
    }]
  }
];

@NgModule({
  declarations: [
    FormsComponent,
    HeroFormComponent,
    HeroFormV2Component,
    HeroFormV3Component,
    ForbiddenValidatorDirective,
    HeroDetailComponent,
    HeroListComponent,
    HeroDetailV2Component,
    DynamicFormMainComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: []
})

export class HeroFormsRoutingModule { }
