import {Component} from "@angular/core";

@Component({
  template: `
    <h3>管理员</h3>
    <nav>
      <ul class="clearfix">
        <li class="pull-left"><a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">首页</a></li>
        <li class="pull-left"><a routerLink="./crises" routerLinkActive="active">危机管理</a></li>
        <li class="pull-left"><a routerLink="./heroes" routerLinkActive="active">英雄管理</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `
})

export class AdminComponent {

}
