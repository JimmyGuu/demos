import {NgModule} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {TestComponent} from "./feature/test.component";
import {TestAComponent} from "./attribute-directives/test-a.component";
import { TestBComponent } from "./structural-directives/test-b.component";
import { PipesComponent } from "./pipes/app.component";

import { NotFoundComponent } from "./not-found.component";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test/a', component: TestAComponent },
  { path: 'test/b', component: TestBComponent },
  { path: 'pipes', component: PipesComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
