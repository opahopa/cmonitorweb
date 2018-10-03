import { Injectable } from '@angular/core';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../models/message';
import {WSEvent} from '../models/enums/wsevent.enum';
import {InfoModalsService} from './info-modals.service';
import {WebsocketService} from './websocket/websocket.service';
import {MatSnackBar} from '@angular/material';


/*
Contains WS messages which requre opening additional modals.
Need to be removed once views are moved from extended table to separate page
 */
@Injectable({
  providedIn: 'root'
})
export class WsMsgWatchTempService {

  constructor(private modals: InfoModalsService,
              public snackBar: MatSnackBar) {
  }

  run(wsService: WebsocketService) {
    wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);

      if (msg.command === MessageCommands.EXTRA_NETSTAT) {
        this.modals.openLogModal('Netstat Log:', msg.body);
      }

      if (msg.type === MessageTypes.REPORT && msg.status === MessageStatus.ERROR) {
        this.parseError(msg);
      }
      if (msg.type === MessageTypes.REPORT && msg.status === MessageStatus.OK) {
        this.parseSuccess(msg);
      }
    });
  }


  parseSuccess(msg: Message) {
    if (msg.command === MessageCommands.POD_UPLOAD_SELFTEST) {
      this.modals.openLogModal('Pod Upload test:', msg.body);
    }
    if (msg.command === MessageCommands.SET_CODIUS_FEE) {
      this.snackBar.open('Set Fee Successful', '', {duration: 3000, });
    }
    if (msg.command === MessageCommands.SET_CODIUSD_VARIABLES) {
      this.snackBar.open('Set Variables Successful', '', {duration: 3000, });
    }
    if (msg.command === MessageCommands.CLEANUP_HYPERD) {
      this.snackBar.open('Hyperd Cleanup Successful', '', {duration: 3000, });
    }
    if (msg.command === MessageCommands.HYPERD_RM_POD) {
      this.snackBar.open('Hyperctl remove pod/s Successful', '', {duration: 3000, });
    }
  }

  parseError(msg: Message) {
    if (msg.command === MessageCommands.CLI_UPGRADE) {
      if (!(msg.body.length < 25)) {
        this.modals.openLogModal('Cli Upgrade:', msg.body);
      }
    }
    if (msg.command === MessageCommands.POD_UPLOAD_SELFTEST) {
      this.modals.openLogModal('Pod Upload test:', msg.body);
    }
    if (msg.command === MessageCommands.SET_CODIUSD_VARIABLES) {
      if (msg.body.length < 25) {
        this.modals.openAlert(msg.body);
      } else {
        this.modals.openLogModal('Set codiusd variables error:', msg.body);
      }
    }
    if (msg.command === MessageCommands.CLEANUP_HYPERD) {
      this.snackBar.open('Hyperd Cleanup Fail', '', {duration: 3000, });
    }
    if (msg.command === MessageCommands.HYPERD_RM_POD) {
      this.snackBar.open('Hyperd remove pod/s Fail', '', {duration: 3000, });
    }
  }
}
