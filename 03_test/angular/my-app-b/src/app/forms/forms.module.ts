import {NgModule} from "@angular/core";
import {HeroFormsRoutingModule} from "./forms-routing.module";
import {HeroService} from "./hero.service";

@NgModule({
  declarations: [],
  imports: [
    HeroFormsRoutingModule
  ],
  exports: [],
  providers: [
    HeroService
  ]
})

export class HeroFormsModule { }
