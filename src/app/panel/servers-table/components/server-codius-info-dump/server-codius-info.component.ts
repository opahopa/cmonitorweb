import {Component, Inject, Input, OnInit} from '@angular/core';
import {Server} from '../../../models/server';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ChangeFeeModalComponent} from '../change-fee-modal/change-fee-modal.component';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../models/message';
import {WSEvent} from '../../../models/enums/wsevent.enum';
import {CliService} from '../../../services/cli.service';
import {APP_CONFIG, IAppConfig} from '../../../../app.config';
import {CodiusVariablesComponent} from './codius-variables/codius-variables.component';
import {InfoModalsService} from '../../../services/info-modals.service';
import {AuthService} from '../../../../services/auth/auth-service.service';


@Component({
  selector: 'app-server-codius-op-info',
  templateUrl: './server-codius-info.component.html',
  styleUrls: ['./server-codius-info.component.scss']
})
export class ServerCodiusInfoOpComponent implements OnInit {
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
              , private modals: InfoModalsService
              , private wsService: WebsocketService
              , private cliService: CliService,
                public snackBar: MatSnackBar,
                private authService: AuthService,
                @Inject(APP_CONFIG) private config: IAppConfig) { }

  ngOnInit() {
    console.log(`server cli version ${this.server.cli_version}`);
    this.cliService.getCliVersion().subscribe((data) => {
      this.latest_cli_version = data.version;
      console.log(`api cli version:${this.latest_cli_version}`);
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
    }
  }

  parseError(msg: Message) {
    if (msg.command === MessageCommands.CLI_UPGRADE) {
      this.status.cli_updating = false;
      if (msg.body.length < 25) {
        this.error.cli_update = msg.body;
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
      body: {duration: 60}, hostname: this.server.hostname
    }));
    this.status.upload_testing = true;
    this.timeoutWatcherError('upload');
  }

  updateCmonCli() {
    this.status.cli_updating = true;
    this.timeoutWatcherError('update');
    this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.CLI_UPGRADE,
      body: { 'token': this.authService.getUser()['token'] }, hostname: this.server.hostname}));
  }

  variablesEditior() {
    const d = this.dialog.open(CodiusVariablesComponent, {
      data: { codius: this.server.codius, hostname: this.server.hostname },
      width: '80vw',
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
    d.afterClosed().subscribe(result => {
      if (result.length > 0) {
        console.log(result)
        this.wsService.sendMessage(new Message({type: MessageTypes.CONTROL, command: MessageCommands.SET_CODIUSD_VARIABLES,
          body: result, hostname: this.server.hostname}));
      }
    });
  }

  timeoutWatcherError(trigger: string) {
    setTimeout(() => {
      const text = 'Looks like CodiusMonitor client is outdated. \n' +
        `To use this function please update your CodiusMonitor client software on this server: ${this.server.hostname}\n.` +
        'Details can be found at \'Client\' tab';
      if (trigger === 'upload' && this.status.upload_testing === true) {
        this.modals.openAlert(text);
      }
      if (trigger === 'update' && this.status.cli_updating === true) {
        this.modals.openAlert(text);
      }
    }, 75000);
  }
}
