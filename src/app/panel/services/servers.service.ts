import { Injectable } from '@angular/core';
import {Server} from '../models/server';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  servers: Server[] = []

  constructor() { }

  addServer(s: Server) {
    if (this.servers.findIndex(el => el.hostname === s.hostname) === -1) {
      this.servers.push(s);
    }
    console.log(this.servers);
  }
}
