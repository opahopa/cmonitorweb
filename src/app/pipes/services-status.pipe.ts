import { Pipe, PipeTransform } from '@angular/core';
import {ServiceState} from '../panel/models/service-state';

@Pipe({
  name: 'servicesStatus'
})
export class ServicesStatusPipe implements PipeTransform {

  transform(services: ServiceState[]): boolean {
    let err_count = 0;
    for (const s of services) {
      if (!s.active) {
        err_count++;
      }
    }
    return err_count > 0 ? false : true;
  }
}
