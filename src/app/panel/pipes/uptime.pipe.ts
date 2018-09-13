import { Pipe, PipeTransform } from '@angular/core';


interface Uptime {
  days: number;
  hours: number;
  minutes: number;
}

@Pipe({
  name: 'uptime'
})
export class UptimePipe implements PipeTransform {

  transform(value: Uptime, args?: any): any {
    if (value.days && value.days > 0) {
      return `${value.days} days`;
    }
    if (value.hours && value.hours > 0) {
      return `${value.hours} hours`;
    }
    if (value.minutes && value.minutes > 0) {
      return `${value.minutes} minutes`;
    } else {
      return 'N/A';
    }
  }

}
