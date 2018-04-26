import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./pages/index/index.component";

const APP_ROUTES: Routes = [
  { path: '', component: IndexComponent },
  { path: 'mine', loadChildren: 'app/pages/user-center/user-center.module#UserCenterModule' }
];

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class AppRoutingModule { }
