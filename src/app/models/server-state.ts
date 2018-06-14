import {ServiceState} from "./service-state";

export class ServerState {
  name:string;
  status:boolean;
  online: Date;
  services: ServiceState[]

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
