import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServiceState} from '../../../models/service-state';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageTypes} from '../../../models/message';

@Component({
  selector: 'app-service-state-modal',
  templateUrl: './service-state-modal.component.html',
  styleUrls: ['./service-state-modal.component.scss']
})
export class ServiceStateModalComponent implements OnInit {
  service: ServiceState;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private wsService: WebsocketService,
              public dialogRef: MatDialogRef<ServiceStateModalComponent>) {
    this.service = this.data.service;
  }

  ngOnInit() {
    console.log(this.data);
  }

  restart() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SERVICE_RESTART,
      body: this.service.name, hostname: this.data.hostname}));
    this.dialogRef.close();
  }

  start() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SERVICE_START,
      body: this.service.name, hostname: this.data.hostname}));
    this.dialogRef.close();
  }

  stop() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SERVICE_STOP,
      body: this.service.name, hostname: this.data.hostname}));
    this.dialogRef.close();
  }
}
