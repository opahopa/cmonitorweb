import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {ServiceState} from '../../../../models/service-state';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../../models/message';
import {WebsocketService} from '../../../../services/websocket/websocket.service';
import {WSEvent} from '../../../../models/enums/wsevent.enum';
import {LogModalComponent} from '../../../../components/log-modal/log-modal.component';
import {ServiceStateModalComponent} from '../../service-state-modal/service-state-modal.component';

@Component({
  selector: 'app-extra-service-menu',
  templateUrl: './extra-service-menu.component.html',
  styleUrls: ['./extra-service-menu.component.scss']
})
export class ExtraServiceMenuComponent implements OnInit {
  service: ServiceState;
  error: string;
  loading: any = {
    install: false,
    stop: false,
    log: false,
  };
  spinner_diam = 30;

  watch_events: MessageCommands[] = [
    MessageCommands.INSTALL_SERVICE,
    MessageCommands.UNINSTALL_SERVICE,
    MessageCommands.SERVICE_SPECAIL_DATA,
    MessageCommands.SERVICE_STOP
  ];

  special_data: string[] = [
    'fail2ban'
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private wsService: WebsocketService
              , public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service = this.data.service;
    if (!this.service.installed) {
      this.error = `Service ${this.service.name} is not installed on this server.`;
    }

    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);
      if (this.watch_events.indexOf(msg.command) !== -1) {
        if (msg.type === MessageTypes.REPORT && msg.status === MessageStatus.ERROR) {
          this.parseErrorWrapper(msg);
        }
        if (msg.type === MessageTypes.REPORT && msg.status === MessageStatus.OK) {
          this.parseSuccess(msg);
        }
      }
    });
  }

  parseSuccess(msg: Message) {
    if (msg.command === MessageCommands.INSTALL_SERVICE) {
      this.loading.install = false;
      this.snackBar.open('Installation Successful', '', {duration: 3000, });
      this.service.installed = true;
    }
    if (msg.command === MessageCommands.UNINSTALL_SERVICE) {
      this.loading.install = false;
      this.service.installed = false;
      this.error = null;
      this.snackBar.open('Uninstall Successful', '', {duration: 3000, });
    }
    if (msg.command === MessageCommands.SERVICE_STOP) {
      this.loading.stop = false;
      this.snackBar.open(`Service stopped: ${this.service.name}`, '', {duration: 3000, });
    }
    if (msg.command === MessageCommands.SERVICE_SPECAIL_DATA) {
      this.loading.log = false;
      console.log('Open special data log');
      this.openLogModal(`${this.service.name} data:`, msg.body);
    }
  }

  parseErrorWrapper(msg: Message) {
    if (msg.command === MessageCommands.INSTALL_SERVICE) {
      this.loading.install = false;
      this.parseError(msg, 'Installation error');
    }
    if (msg.command === MessageCommands.UNINSTALL_SERVICE) {
      this.loading.install = false;
      this.parseError(msg, 'Uninstall error');
    }
    if (msg.command === MessageCommands.SERVICE_STOP) {
      this.loading.stop = false;
      this.parseError(msg, 'Service stop error');
    }
    if (msg.command === MessageCommands.SERVICE_SPECAIL_DATA) {
      this.loading.log = false;
      this.parseError(msg, 'Data load error');
    }
  }

  parseError(msg: Message, err_short: string) {
    if (msg.body.length < 25) {
      this.error = msg.body;
    } else {
      this.error = err_short;
      this.openLogModal(`${err_short}:`, msg.body);
    }
  }

  serviceStatus() {
    this.dialog.open(ServiceStateModalComponent, {
      width: '95vw',
      data: {service: this.service, hostname: this.data.hostname}
    });
  }


  serviceStop() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SERVICE_STOP,
      hostname: this.data.hostname, body: this.service.name }));
    this.loading.stop = true;
  }

  specialLog(service_name: string) {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SERVICE_SPECAIL_DATA,
      hostname: this.data.hostname, body: service_name }));
    this.loading.log = true;
  }

  serviceInstall() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.INSTALL_SERVICE,
      hostname: this.data.hostname, body: this.service.name }));
    this.loading.install = true;
    this.error = 'Installing, please wait... ';
  }

  serviceUninstall() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.UNINSTALL_SERVICE,
      hostname: this.data.hostname, body: this.service.name }));
    this.loading.install = true;
    this.error = 'Uninstalling, please wait... ';
  }


  openLogModal(title: string, content: any) {
    this.dialog.open(LogModalComponent, {
      data: { title: title, log: content },
      width: '95vw',
      maxWidth: '95vw',
    });
  }
}
