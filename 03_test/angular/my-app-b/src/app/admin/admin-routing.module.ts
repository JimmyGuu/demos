import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {ManageCrisesComponent} from "./manage-crises.component";
import {ManageHeroesComponent} from "./manage-heroes.component";
import {AdminDashboardComponent} from "./admin-dashboard.component";

import { AuthGuardService } from "../auth-guard.service";

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '', // 无组件路由
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})

export class AdminRoutingModule { }
