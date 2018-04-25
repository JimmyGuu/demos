import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const APP_ROUTES: Routes = [
  { path: 'mine', loadChildren: 'app/pages/user-center/user-center.module#UserCenterModule' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class AppRoutingModule { }
