import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Server} from '../../models/server';
import {ServersService} from '../../services/servers.service';
import {MonitorService} from '../../services/monitor/monitor.service';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../models/message';
import {WSEvent} from '../../models/enums/wsevent.enum';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-server-panel',
  templateUrl: './server-panel.component.html',
  styleUrls: ['./server-panel.component.scss']
})
export class ServerPanelComponent implements OnDestroy {
  private _wsSubscription: Subscription;

  server: Server;
  hostname: string;
  stats_system: any[];

  breakpoint: number;
  breakpoint_resol = 745;

  constructor(private route: ActivatedRoute, private serversService: ServersService, private monitorService: MonitorService,
              private wsService: WebsocketService) {
    this.hostname = this.route.snapshot.paramMap.get('hostname');

    this.breakpoint = (window.innerWidth <= this.breakpoint_resol) ? 1 : 6;

    if (this.monitorService.ws_status !== 'connected'
      || this.monitorService.websocketState() !== 1) {
      this.monitorService.connect();
    }

    if (this.serversService.getServers().length > 0) {
      this.server = this.serversService.getServers().find(s => s.hostname === this.hostname);
    }
    this.serversService.getServersSubj().subscribe((servers) => {
      if (servers) {
        this.server = servers.find(s => s.hostname === this.hostname);
      }
    });
    this.requestStats();
  }

  requestStats() {
    if (this.monitorService.websocketState() !== 1) {
      this.monitorService.wsStateSubj.subscribe(v => {
        if (v === 'connected') {
          this.sendStatsCommandAndSubscr();
        }
      });
    } else {
      this.sendStatsCommandAndSubscr();
    }
  }

  sendStatsCommandAndSubscr() {
    this.wsService.sendMessage(
      new Message({type: MessageTypes.CONTROL, command: MessageCommands.STATS_SYSTEM, body: {days: 1}, hostname: this.hostname}));
    this._wsSubscription = this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);
      if (msg.command === MessageCommands.STATS_SYSTEM && msg.status === MessageStatus.OK) {
        this.parseSystemStats(msg);
      }
    });
  }

  parseSystemStats(msg: Message) {
    this.stats_system = msg.body;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= this.breakpoint_resol) ? 1 : 6;
  }

  ngOnDestroy() {
    this._wsSubscription.unsubscribe();
  }
}
