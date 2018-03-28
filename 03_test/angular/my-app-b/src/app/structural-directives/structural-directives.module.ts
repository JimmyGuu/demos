import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { TestBComponent } from "./test-b.component";
import { UnlessDirective } from "./unless.directive";

@NgModule({
  declarations: [
    TestBComponent,
    UnlessDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TestBComponent
  ]
})

export class StructuralDirectivesModule {}
