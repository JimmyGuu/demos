import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsComponent} from "./forms.component";
import {FormsModule} from "@angular/forms";
import {HeroFormComponent} from "./hero-form.component";

const ROUTES: Routes = [
  {
    path: 'forms',
    component: FormsComponent,
    children: [{
      path: '',
      children: [
        { path: 'hero-form', component: HeroFormComponent }
      ]
    }]
  }
];

@NgModule({
  declarations: [
    FormsComponent,
    HeroFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: []
})

export class HeroFormsRoutingModule { }
