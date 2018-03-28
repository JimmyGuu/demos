import {NgModule} from "@angular/core";

import { HighlightDirective } from "./highlight.directive";

import { TestAComponent } from "./test-a.component";

@NgModule({
  declarations: [
    HighlightDirective,
    TestAComponent
  ],
  exports: []
})

export class AttributeDirectivesModule {}
