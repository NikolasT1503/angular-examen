import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buttonAdd'
})
export class ButtonAddPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
