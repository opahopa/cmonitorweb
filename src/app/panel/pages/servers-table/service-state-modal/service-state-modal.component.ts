import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private wsService: WebsocketService) {
    this.service = this.data.service;
  }

  ngOnInit() {
    console.log(this.data);
  }

  restart() {
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SERVICE_RESTART,
      body: this.service.name, hostname: this.data.hostname}));
  }

}
