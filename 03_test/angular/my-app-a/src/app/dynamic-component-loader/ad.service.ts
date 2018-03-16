import {Injectable} from "@angular/core";
import {AdItem} from "./ad-item";
import {HeroProfileComponent} from "./hero-profile.component";
import {HeroJobAdComponent} from "./hero-job-ad.component";

@Injectable()
export class AdService {
  public getAds() {
    return [
      new AdItem(HeroProfileComponent, {name: 'Bob fk', bio: 'Brave 123'}),
      new AdItem(HeroProfileComponent, {name: 'Dr Ass', bio: 'Brave 456'}),
      new AdItem(HeroJobAdComponent, {headline: 'Hiring for several position', body: 'Submit ur resume today!'}),
      new AdItem(HeroJobAdComponent, {headline: 'Openings in all departments', body: 'Applt today!'}),
    ];
  }
}
