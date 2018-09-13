import {Component, Inject, Input, OnInit} from '@angular/core';
import {Server} from '../../../models/server';
import {MatDialog} from '@angular/material';
import {ChangeFeeModalComponent} from '../change-fee-modal/change-fee-modal.component';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../models/message';
import {WSEvent} from '../../../models/enums/wsevent.enum';
import {LogModalComponent} from '../../../components/log-modal/log-modal.component';
import {CliService} from '../../../services/cli.service';
import {APP_CONFIG, IAppConfig} from '../../../../app.config';
import {AlertComponent} from '../../../components/alert/alert.component';


@Component({
  selector: 'app-server-codius-info',
  templateUrl: './server-codius-info.component.html',
  styleUrls: ['./server-codius-info.component.scss']
})
export class ServerCodiusInfoComponent implements OnInit {
  @Input() server: Server;

  status: any = {
    cli_updating: false,
    upload_testing: false
  };
  error: any = {
    cli_update: '',
    upload_test: '',
    tooltip_info: ''
  };
  latest_cli_version: string;

  constructor(public dialog: MatDialog
              , private wsService: WebsocketService
              , private cliService: CliService
              , @Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
    this.cliService.getCliVersion().subscribe((data) => {
      this.latest_cli_version = data.version;
    });
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);

      // Upgrade response received only in case of failure
      if (msg.command === MessageCommands.CLI_UPGRADE && msg.hostname === this.server.hostname) {
        this.error.cli_update = 'Cmoncli Autoupdate failed';
        this.error.tooltip_info = msg.body;
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
      this.status.upload_testing = false;
      this.openLogModal('Pod Upload test:', msg.body);
    }
  }

  parseError(msg: Message) {
    if (msg.command === MessageCommands.CMONCLI_UPDATE) {
      this.status.cli_updating = false;
      if (msg.body.length < 25) {
        this.error.cli_update = msg.body;
      } else {
        this.openLogModal('Pod Upload test:', msg.body);
      }
    }
    if (msg.command === MessageCommands.POD_UPLOAD_SELFTEST) {
      this.status.upload_testing = false;
      if (msg.body.length < 25) {
        this.error.upload_test = msg.body;
      } else {
        this.openLogModal('Pod Upload test:', msg.body);
      }
    }
  }

  changeFee() {
    this.dialog.open(ChangeFeeModalComponent, {
      data: { hostname: this.server.hostname },
      width: '250px'
    });
  }

  testUpload() {
    this.wsService.sendMessage(new Message({
      type: MessageTypes.CONTROL, command: MessageCommands.POD_UPLOAD_SELFTEST,
      hostname: this.server.hostname
    }));
    this.status.upload_testing = true;
    this.timeoutWatcherError('upload');
  }

  updateCmonCli() {
    this.status.cli_updating = true;
    this.timeoutWatcherError('update');
    this.cliService.genCli().subscribe(data => {
        if (data['installer']) {
          this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.CMONCLI_UPDATE,
            body: data['installer'], hostname: this.server.hostname}));
        } else {
          this.error.cli_update = 'Failed to get installer link';
          this.status.cli_updating = false;
        }
      },
      error => {
        this.error.cli_update = error;
        this.status.cli_updating = false;
        this.openLogModal('Cli Update Error:', error);
      });
  }

  updateCodius() {

  }

  openLogModal(title: string, content: any) {
    this.dialog.open(LogModalComponent, {
      data: { title: title, log: content },
      width: '95vw',
      maxWidth: '95vw',
    });
  }

  timeoutWatcherError(trigger: string) {
    setTimeout(() => {
      const text = 'Looks like CodiusMonitor client is outdated. \n' +
        `To use this function please update your CodiusMonitor client software on this server: ${this.server.hostname}\n.` +
        'Details can be found at \'Client\' tab';
      if (trigger === 'upload' && this.status.upload_testing === true) {
        this.dialog.open(AlertComponent, {
          data: { message: text}
        });
      }
      if (trigger === 'update' && this.status.cli_updating === true) {
        this.dialog.open(AlertComponent, {
          data: { message: text}
        });
      }
    }, 75000);
  }
}
