import { Injectable, OnDestroy } from '@angular/core';
import { MessagesService } from '../../message/messages.service';
import {WebsocketService} from '../websocket/websocket.service';
import {WSEvent} from '../../models/enums/wsevent.enum';
import {Message, MessageTypes, MessageCommands} from '../../models/message';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth-service.service';
import {ServersService} from '../servers.service';
import {Server} from '../../models/server';
import {MatDialog, MatSnackBar} from '@angular/material';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService implements OnDestroy {
  ws_status: string;
  private ws_status_subj = new BehaviorSubject(null);
  upgrade_command_sent = false;

  constructor(private messagesService: MessagesService,
              private wsService: WebsocketService,
              private router: Router,
              private authService: AuthService,
              private serversService: ServersService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {}

  connect(): boolean {
    this.wsService.initConnection();
    this.initWatchers();

    return true;
  }

  initWatchers(): void {
    this.wsService.watchEvent(WSEvent.OPEN).subscribe(data => {
      this.ws_status = 'connected';
      this.ws_status_subj.next(this.ws_status);

      this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.STATUS_ALL}));
    });
    this.wsService.watchEvent(WSEvent.CLOSE).subscribe((data) => {
      this.ws_status_subj.next('disconnected');
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
    // console.log(`Received: ${msg.command}`);
    switch (msg.command) {
      case MessageCommands.STATUS_ALL:
        this.serversService.addServer(new Server(
          {hostname: msg.hostname, active: true, services: msg.body.system,
            codius: msg.body.codius, extra_services: msg.body.extra_services, cli_version: msg.body.cli_version}));
        break;
      case MessageCommands.STATUS_CLI_DISCONNECT:
        this.serversService.removeServer(msg.hostname);
        break;
      case MessageCommands.STATUS_CLI_UPDATE:
        this.serversService.updateServer(new Server(
          {hostname: msg.hostname, active: true, services: msg.body.system,
            codius: msg.body.codius, extra_services: msg.body.extra_services, cli_version: msg.body.cli_version}));
        break;
      case MessageCommands.CLI_UPGRADE_REQUIRED:
        if (!this.upgrade_command_sent) {
          this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.CLI_UPGRADE,
            body: { 'token': this.authService.getUser()['token'] }, hostname: msg.hostname}));
          this.upgrade_command_sent = true;
        }
        break;
      case MessageCommands.SERVICE_START:
        this.snackBar.open('Service Start Successful', '', {duration: 3000, }); break;
      case MessageCommands.SERVICE_STOP:
        this.snackBar.open('Service Stop Successful', '', {duration: 3000, }); break;
      case MessageCommands.SERVICE_RESTART:
        this.snackBar.open('Service Restart Successful', '', {duration: 3000, }); break;
    }
  }

  websocketState() {
    return this.wsService.state();
  }

  get wsStateSubj() {
    return this.ws_status_subj;
  }

  ngOnDestroy() {
    console.log('Monitor ngOnDestroy');
    this.wsService.closeConnection();
  }
}
