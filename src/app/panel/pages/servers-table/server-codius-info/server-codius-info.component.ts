import {Component, Inject, Input, OnInit} from '@angular/core';
import {Server} from '../../../models/server';
import {MatDialog} from '@angular/material';
import {ChangeFeeModalComponent} from '../change-fee-modal/change-fee-modal.component';
import {UploadTestModalComponent} from '../upload-test-modal/upload-test-modal.component';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../models/message';
import {WSEvent} from '../../../models/enums/wsevent.enum';
import {LogModalComponent} from '../../../components/log-modal/log-modal.component';
import {CliService} from '../../../../services/cli.service';
import {APP_CONFIG, IAppConfig} from '../../../../app.config';

@Component({
  selector: 'app-server-codius-info',
  templateUrl: './server-codius-info.component.html',
  styleUrls: ['./server-codius-info.component.scss']
})
export class ServerCodiusInfoComponent implements OnInit {
  @Input() server: Server;
  is_updating = false;
  error_cli_update: string;

  constructor(public dialog: MatDialog
              , private wsService: WebsocketService
              , private cliService: CliService
              , @Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);
      if (msg.type === MessageTypes.REPORT && msg.command === MessageCommands.CMONCLI_UPDATE) {
        switch (msg.status) {
          case MessageStatus.OK: {
            this.dialog.open(LogModalComponent, {
              data: { log: msg.body },
              width: '80vw',
              height: '80vh'
            });
            break;
          }
          case MessageStatus.ERROR: {
            this.error_cli_update = msg.body;
            break;
          }
        }
        this.is_updating = false;
      }
    });
  }

  changeFee() {
    this.dialog.open(ChangeFeeModalComponent, {
      data: { hostname: this.server.hostname },
      width: '250px'
    });
  }

  testUpload() {
    this.dialog.open(UploadTestModalComponent, {
      data: { hostname: this.server.hostname },
      width: '80vw',
      height: '80vh'
    });
  }

  updateCmonCli() {
    this.is_updating = true;
    let installer_link = '';
    this.cliService.genCli().subscribe(data => {
        if (data['installer'] && data['installer'].lenght > 0) {
          installer_link = `wget ${this.config.apiEndpoint}${data['installer']} -O cmoncli-install.sh && bash cmoncli-install.sh`;
          this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.CMONCLI_UPDATE,
            body: installer_link, hostname: this.server.hostname}));
        } else {
          this.error_cli_update = 'Failed to get installer link';
        }
        this.is_updating = false;
      },
      error => {
        this.error_cli_update = error;
        this.is_updating = false;
      });
  }

  updateCodius() {

  }

}
