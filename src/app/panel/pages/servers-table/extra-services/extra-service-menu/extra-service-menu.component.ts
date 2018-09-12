import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {ServiceState} from '../../../../models/service-state';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../../models/message';
import {WebsocketService} from '../../../../services/websocket/websocket.service';
import {WSEvent} from '../../../../models/enums/wsevent.enum';
import {LogModalComponent} from '../../../../components/log-modal/log-modal.component';

@Component({
  selector: 'app-extra-service-menu',
  templateUrl: './extra-service-menu.component.html',
  styleUrls: ['./extra-service-menu.component.scss']
})
export class ExtraServiceMenuComponent implements OnInit {
  service: ServiceState;
  error: string;
  loading = false;

  watch_events: MessageCommands[] = [
    MessageCommands.INSTALL_SERVICE
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
          this.parseError(msg);
        }
        if (msg.type === MessageTypes.REPORT && msg.status === MessageStatus.OK) {
          this.parseSuccess(msg);
        }
      }
    });
  }

  parseSuccess(msg: Message) {
    if (msg.command === MessageCommands.INSTALL_SERVICE) {
      this.loading = false;
      this.snackBar.open('Installation Successful', '', {duration: 3000, });
      this.service.installed = true;
    }
  }

  parseError(msg: Message) {
    if (msg.command === MessageCommands.INSTALL_SERVICE) {
      this.loading = false;
      if (msg.body.length < 25) {
        this.error = msg.body;
      } else {
        this.error = 'Installation error';
        this.openLogModal('Installation error:', msg.body);
      }
    }
  }

  serviceStatus() {

  }

  serviceLog() {

  }

  serviceInstall() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.INSTALL_SERVICE,
      hostname: this.data.hostname, body: this.service.name }));
    this.loading = true;
    this.error = 'Installing, please wait... ';
  }


  openLogModal(title: string, content: any) {
    this.dialog.open(LogModalComponent, {
      data: { title: title, log: content },
      width: '95vw',
      maxWidth: '95vw',
    });
  }
}
