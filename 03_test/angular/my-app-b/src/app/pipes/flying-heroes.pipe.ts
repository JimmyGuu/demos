import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'flyingHeroes'
})

export class FlyingHeroesPipe implements PipeTransform{
  transform(value: any[]) {
    return value.filter(hero => hero.canfly);
  }
}
