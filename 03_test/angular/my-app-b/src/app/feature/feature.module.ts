import {NgModule} from "@angular/core";

import {AppRoutingModule} from "../app-routing.module";

import { TestComponent } from "./test.component";

@NgModule({
  imports: [
    AppRoutingModule
  ],
  declarations: [
    TestComponent
  ],
  exports: [
    TestComponent
  ]
})

export class FeatureModule {}
