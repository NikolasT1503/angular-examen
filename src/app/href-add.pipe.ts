import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrefAdd'
})
export class HrefAddPipe implements PipeTransform {

  transform(url: string): unknown {
    let str: string = '<a href="'+url+'" target="_blanc"><img width="20" height="20 src="../../assets/github.png"></a>';
    return str;
  }

}
