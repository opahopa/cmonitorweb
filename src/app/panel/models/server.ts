import {ServiceState} from './service-state';

export interface ServerCodius {
  version: string;
  pods: any[];
  memory: any;
}

export class Server {
  hostname: string;
  services: ServiceState[];
  codius: ServerCodius;
  active: boolean;

  constructor(settings: { hostname: string, services?: ServiceState[], active: boolean, codius?: ServerCodius}) {
    this.hostname = settings.hostname;
    this.active = settings.active;
    this.codius = settings.codius;
    this.services = <ServiceState[]>settings.services;
  }
}
