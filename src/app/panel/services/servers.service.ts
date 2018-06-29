import { Injectable } from '@angular/core';
import {Server} from '../models/server';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  private servers: Server[] = [];
  private serversChanges = new BehaviorSubject(this.servers);

  constructor() {
  }

  addServer(s: Server) {
    if (this.servers.findIndex(el => el.hostname === s.hostname) === -1) {
      this.servers.push(s);
      this.serversChanges.next(this.servers);
    }
  }

  removeServer(hostname: string) {
    const index = this.servers.findIndex(el => el.hostname === hostname);
      if (index !== -1) {
        this.servers.splice(index, 1);
        this.serversChanges.next(this.servers);
    }
    console.log(`removed from active: ${hostname}`);
  }

  updateServer(s: Server) {
    const index = this.servers.findIndex(el => el.hostname === s.hostname);
    if (index !== -1) {
      this.servers[index] = s;
      // this.serversUpdates.next(s);
      this.serversChanges.next(this.servers);
    } else if (index === -1) {
      this.addServer(s);
    }
  }

  getServersSubj(): Observable<Server[]> {
    return this.serversChanges;
  }

  getServers(): Server[] {
    return this.servers;
  }
}
