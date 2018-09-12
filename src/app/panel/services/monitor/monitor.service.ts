import { Injectable, OnDestroy } from '@angular/core';
import { MessagesService } from '../../message/messages.service';
import {WebsocketService} from '../websocket/websocket.service';
import {WSEvent} from '../../models/enums/wsevent.enum';
import {Message, MessageTypes, MessageCommands} from '../../models/message';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth-service.service';
import {ServersService} from '../servers.service';
import {Server} from '../../models/server';

@Injectable({
  providedIn: 'root'
})
export class MonitorService implements OnDestroy {
  ws_status: string;

  constructor(private messagesService: MessagesService, private wsService: WebsocketService, private router: Router,
              private authService: AuthService, private serversService: ServersService) {}

  connect(): boolean {
    this.wsService.initConnection();
    this.initWatchers();

    this.ws_status = 'connected';
    return true;
  }

  initWatchers(): void {
    this.wsService.watchEvent(WSEvent.OPEN).subscribe(data => {
      this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.STATUS_ALL}));
    });
    this.wsService.watchEvent(WSEvent.CLOSE).subscribe((data) => {
      console.log(data);
      this.ws_status = `error: ${data.code}`;
      switch (data.code) {
        case 4003:
          this.authService.logout();
          this.router.navigate(['/login']);
          break;
        case 4001:
          this.authService.logout();
          this.router.navigate(['/login']);
          break;
        case 1006:
          this.authService.logout();
          this.router.navigate(['/login']);
          break;
        case 1011:
          alert('Internal error (1011). Please try again after 5 minutes. Contact administrator if repeated');
      }
    });
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);
      this.parseMessage(msg);
    });
  }

  parseMessage(msg: Message) {
    switch (msg.type) {
      case MessageTypes.CONTROL:
        break;
      case MessageTypes.REPORT:
        this._parseMessageReport(msg);
        break;
    }
  }
  _parseMessageReport(msg: Message) {
    console.log(`Received: ${msg.command}`);
    switch (msg.command) {
      case MessageCommands.STATUS_ALL:
        this.serversService.addServer(new Server(
          {hostname: msg.hostname, active: true, services: msg.body.system, codius: msg.body.codius, extra_services: msg.body.extra_services}));
        break;
      case MessageCommands.STATUS_CLI_DISCONNECT:
        this.serversService.removeServer(msg.hostname);
        break;
      case MessageCommands.STATUS_CLI_UPDATE:
        this.serversService.updateServer(new Server(
          {hostname: msg.hostname, active: true, services: msg.body.system, codius: msg.body.codius, extra_services: msg.body.extra_services}));
        break;
    }
  }

  websocketState() {
    return this.wsService.state();
  }

  ngOnDestroy() {
    console.log('Monitor ngOnDestroy')
    this.wsService.closeConnection();
  }
}
