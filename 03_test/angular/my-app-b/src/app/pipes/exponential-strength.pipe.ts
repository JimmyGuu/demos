import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'exponentialStrength'
})

// PipeTransform是可选的，ng会直接查找并执行transform方法
export class ExponentialStrengthPipe implements PipeTransform{
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}
