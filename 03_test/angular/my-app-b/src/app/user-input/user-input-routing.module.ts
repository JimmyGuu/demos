import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {UserInputComponent} from "./user-input.component";
import {KeyupComponent} from "./keyup.component";

const ROUTES: Routes = [
  {
    path: 'user-input',
    component: UserInputComponent,
    children: [{
        path: '',
      children: [
        { path: 'keyup', component: KeyupComponent }
      ]
    }]
  }
];

@NgModule({
  declarations: [
    UserInputComponent,
    KeyupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  providers: []
})

export class UserInputRoutingModule { }
