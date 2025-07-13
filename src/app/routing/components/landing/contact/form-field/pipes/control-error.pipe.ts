import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'controlError',
})
export class ControlErrorPipe implements PipeTransform {
  transform(value: FormControl, arg: string): string {
    if (value.hasError('required')) return `Your ${arg} is required!`;
    if (value.hasError('pattern') || value.hasError('email')) return `Your ${arg} is not valid!`;
    if (value.hasError('maxLength')) return `Your ${arg} is too long!`;
    return `Your ${arg} is required!`;
  }
}
