import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'controlIsValid'
})
export class ControlIsValidPipe implements PipeTransform {

  transform(value: FormControl, ...args: unknown[]): boolean {
    return value.valid && (value.dirty || value.touched);
  }

}
