import {ServiceState} from './service-state';

export class Server {
  hostname: string;
  services: ServiceState[];
  active: boolean;

  constructor(settings: { hostname: string, services?: ServiceState[], active: boolean}) {
    this.hostname = settings.hostname;
    this.active = settings.active;
    this.services = <ServiceState[]>settings.services;
  }
}
