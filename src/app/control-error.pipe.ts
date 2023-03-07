import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'controlError'
})
export class ControlErrorPipe implements PipeTransform {

  transform(value: FormControl, arg: string): string {
    if (value.hasError('required'))
      return `Your ${arg} is required!`;
    if (value.hasError('email'))
      return `Your ${arg} is not a email address!`;
    return `Your ${arg} is required!`;
  }

}
