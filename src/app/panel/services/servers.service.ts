import { Injectable } from '@angular/core';
import {Server} from '../models/server';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  private servers: Server[] = [];
  serversChanges = new Subject();

  constructor() {
  }

  addServer(s: Server) {
    // this.servers.push(s);
    // this.serversChanges.next();

    if (this.servers.findIndex(el => el.hostname === s.hostname) === -1) {
      this.servers.push(s);
      this.serversChanges.next();
    }
    console.log(this.servers);
  }

  removeServer(hostname: string) {
    const index = this.servers.findIndex(el => el.hostname === hostname);
      if (index !== -1) {
        this.servers.splice(index, 1);
        this.serversChanges.next();
    }
    console.log(`removed from active: ${hostname}`);
  }

  updateServer(s: Server) {
    const index = this.servers.findIndex(el => el.hostname === s.hostname);
    if (index !== -1) {
      this.servers[index] = s;
      this.serversChanges.next();
    }
    // console.log(`updated: ${s.hostname}`);
  }

  getServers(): Server[] {
    return this.servers;
  }
}
