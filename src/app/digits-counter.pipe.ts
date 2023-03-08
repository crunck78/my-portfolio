import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitsCounter'
})
export class DigitsCounterPipe implements PipeTransform {

  transform(value: number, maxValue: number): string {
    let result = value.toString();
    const MAX_DIGITS = maxValue.toString().length;
    const CURRENT_DIGITS = result.length;
    const DIFFERENCE = MAX_DIGITS - CURRENT_DIGITS;

    for (let index = 0; index < DIFFERENCE; index++) {
      result = "0"+result;
    }
    return result;
  }
}
