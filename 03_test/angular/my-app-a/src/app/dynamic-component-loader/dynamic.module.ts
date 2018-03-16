import {NgModule} from "@angular/core";

import { AdBannerComponent } from "./ad-banner.component";
import { AdComponent } from "./ad.component";
import { AdDirective } from "./ad.directive";
import { AdService } from "./ad.service";
import { DynamicComponent } from "./dynamic.component";
import { HeroJobAdComponent } from "./hero-job-ad.component";
import { HeroProfileComponent } from "./hero-profile.component";
import { AdItem } from "./ad-item";

@NgModule({
  declarations: [
    AdDirective,
    AdBannerComponent,
    AdComponent,
    DynamicComponent,
    AdItem
  ],
  entryComponents: [
    HeroJobAdComponent,
    HeroProfileComponent
  ],
  providers: [
    AdService
  ],
  exports: [
    AdDirective,
    AdBannerComponent,
    AdComponent,
    DynamicComponent,
    AdItem,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdService
  ]
})

export class DynamicModule {}
