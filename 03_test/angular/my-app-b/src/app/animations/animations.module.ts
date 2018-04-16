import {NgModule} from "@angular/core";
import {AnimationsRoutingModule} from "./animations-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    AnimationsRoutingModule
  ],
  exports: [],
  providers: []
})

export class AnimationsModule { }
