import {Pipe} from "@angular/core";
import {FlyingHeroesPipe} from "./flying-heroes.pipe";

@Pipe({
  name: 'flyingHeroesImpure',
  pure: false // 检测对象数组变化
})

export class FlyingHeroesImpurePipe extends FlyingHeroesPipe{

}
