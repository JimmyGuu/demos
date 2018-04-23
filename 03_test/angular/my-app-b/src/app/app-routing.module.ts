import {NgModule} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {TestComponent} from "./feature/test.component";
import {TestAComponent} from "./attribute-directives/test-a.component";
import { TestBComponent } from "./structural-directives/test-b.component";
import { PipesComponent } from "./pipes/app.component";

import { NotFoundComponent } from "./not-found.component";
import {HttpClientDemoModule} from "./http-client/http-client.module";
// import {AdminModule} from "./admin/admin.module";
// import {AnimationsModule} from "./animations/animations.module";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test/a', component: TestAComponent },
  { path: 'test/b', component: TestBComponent },
  { path: 'pipes', component: PipesComponent },
  // lazyload modules
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: 'animations', loadChildren: 'app/animations/animations.module#AnimationsModule' },
  { path: 'user-input', loadChildren: 'app/user-input/user-input.module#UserInputModule' },
  { path: 'forms', loadChildren: 'app/forms/forms.module#HeroFormsModule' },
  { path: 'http-client', loadChildren: 'app/http-client/http-client.module#HttpClientDemoModule' },
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
