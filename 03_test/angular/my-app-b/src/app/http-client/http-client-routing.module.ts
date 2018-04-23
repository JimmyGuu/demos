import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientDemoComponent} from "./http-client.component";
import {ConfigComponent} from "./config.component";
import {CommonModule} from "@angular/common";
import {DownloaderComponent} from "./downloader.component";
import {PackageSearchComponent} from "./package-search.component";

const ROUTES: Routes = [{
  path: '',
  component: HttpClientDemoComponent,
  children: [{
    path: '',
    children: [
      { path: 'config', component: ConfigComponent },
      { path: 'downloader', component: DownloaderComponent },
      { path: 'package-search', component: PackageSearchComponent },
    ]
  }]
}];

@NgModule({
  declarations: [
    HttpClientDemoComponent,
    ConfigComponent,
    DownloaderComponent,
    PackageSearchComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule
  ],
  exports: [],
  providers: []
})

export class HttpClientDemoRoutingModule { }
