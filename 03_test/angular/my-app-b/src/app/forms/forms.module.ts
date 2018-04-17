import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeroFormsRoutingModule} from "./forms-routing.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HeroFormsRoutingModule
  ],
  exports: [],
  providers: []
})

export class HeroFormsModule { }
