import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Server} from '../../models/server';
import {ServersService} from '../../services/servers.service';
import {MonitorService} from '../../services/monitor/monitor.service';

@Component({
  selector: 'app-server-panel',
  templateUrl: './server-panel.component.html',
  styleUrls: ['./server-panel.component.scss']
})
export class ServerPanelComponent {
  server: Server;
  hostname: string;
  stats_system: any[];

  breakpoint: number;
  breakpoint_resol = 745;

  constructor(private route: ActivatedRoute, private serversService: ServersService, private monitorService: MonitorService) {
    this.hostname = this.route.snapshot.paramMap.get('hostname');

    if (this.monitorService.ws_status !== 'connected'
      || this.monitorService.websocketState() !== 1) {
      this.monitorService.connect();
    }

    this.breakpoint = (window.innerWidth <= this.breakpoint_resol) ? 1 : 6;

    if (this.serversService.getServers().length > 0) {
      this.server = this.serversService.getServers().find(s => s.hostname === this.hostname);
    }
    this.serversService.getServersSubj().subscribe((servers) => {
      if (servers) {
        this.server = servers.find(s => s.hostname === this.hostname);
      }
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= this.breakpoint_resol) ? 1 : 6;
    console.log(this.breakpoint)
  }
}
