import {ServiceState} from './service-state';
import {ServerCodius} from './server-codius';

export class Server {
  hostname: string;
  services: ServiceState[];
  extra_services: ServiceState[];
  codius: ServerCodius;
  active: boolean;
  cli_version: string;

  constructor(settings: { hostname: string, services?: ServiceState[], active: boolean
    , codius?: ServerCodius, extra_services?: ServiceState[], cli_version?: string}) {
    this.hostname = settings.hostname;
    this.active = settings.active;
    this.codius = settings.codius;
    this.services = <ServiceState[]>settings.services;
    this.extra_services = <ServiceState[]>settings.extra_services;
    this.cli_version = settings.cli_version;
  }
}
