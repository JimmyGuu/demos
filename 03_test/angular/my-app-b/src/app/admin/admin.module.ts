import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminComponent } from "./admin.component";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { ManageHeroesComponent } from "./manage-heroes.component";
import { ManageCrisesComponent } from "./manage-crises.component";

import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageHeroesComponent,
    ManageCrisesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: []
})

export class AdminModule {

}
