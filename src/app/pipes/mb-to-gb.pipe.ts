import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mbToGb'
})
export class MbToGbPipe implements PipeTransform {

  transform(mb: number): any {
    if (mb) {
      return Math.round(mb * 10 / 1024) / 10;
    }
  }

}
