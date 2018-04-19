import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeroFormsRoutingModule} from "./forms-routing.module";
import {HeroService} from "./hero.service";

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    HeroFormsRoutingModule
  ],
  exports: [],
  providers: [
    HeroService
  ]
})

export class HeroFormsModule { }
