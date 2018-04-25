import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserCenterComponent} from "./user-center.component";
import {CommonModule} from "@angular/common";
import {UserCenterIndexComponent} from "./index.componet";
import {UserCenterSettingsComponent} from "./settings.component";

const ROUTES: Routes = [{
  path: '',
  component: UserCenterComponent,
  children: [{
    path: '',
    children: [
      { path: '', component: UserCenterIndexComponent },
      { path: 'settings', component: UserCenterSettingsComponent }
    ]
  }]
}];

@NgModule({
  declarations: [
    UserCenterComponent,
    UserCenterIndexComponent,
    UserCenterSettingsComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class UserCenterRoutingModule { }
