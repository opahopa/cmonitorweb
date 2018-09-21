import {Component, Input, OnInit} from '@angular/core';
import {ServiceState} from '../../../models/service-state';
import {ExtraServiceMenuComponent} from './extra-service-menu/extra-service-menu.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {InfoModalsService} from '../../../services/info-modals.service';
import {NetstatComponent} from './netstat/netstat.component';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../models/message';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {WSEvent} from '../../../models/enums/wsevent.enum';

@Component({
  selector: 'app-extra-services',
  templateUrl: './extra-services.component.html',
  styleUrls: ['./extra-services.component.scss']
})
export class ExtraServicesComponent implements OnInit {
  @Input() extra_services?: ServiceState[];
  @Input() hostname: string;
  service: ServiceState;
  loading: any = {
    cleanup: false
  };

  constructor(public dialog: MatDialog, private modals: InfoModalsService, private wsService: WebsocketService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);

      if (msg.type === MessageTypes.REPORT
        && msg.command === MessageCommands.CLEANUP_HYPERD
        && msg.status === MessageStatus.ERROR) {
        this.snackBar.open('Hyperd Cleanup Successful', '', {duration: 3000, });
      }
      if (msg.type === MessageTypes.REPORT
        && msg.command === MessageCommands.CLEANUP_HYPERD
        && msg.status === MessageStatus.ERROR) {
        this.snackBar.open('Hyperd Cleanup Fail', '', {duration: 3000, });
      }
    });
  }

  /// for services names refer to API
  /// settings: EXTRA_SERVICES
  /// hardcoded for speed
  openExtraService(name: string) {
    const alert = 'CodiusMonitor client version is outdated. \n' +
      'To use this function please update your codiusmonitor client software on this server.\n' +
      'Details can be found at \'Client\' tab.';
    if (this.extra_services) {
      const service = this.extra_services.find(i => i.name === name);

      if (service) {
        this.dialog.open(ExtraServiceMenuComponent, {
          data: {service: service, hostname: this.hostname},
          minWidth: '35vw'
        });
      } else {
        this.modals.openAlert(alert);
      }
    } else {
      this.modals.openAlert(alert);
    }
  }

  netstat() {
    const m = this.dialog.open(NetstatComponent, {

    });
    m.afterClosed().subscribe(result => {
      if (result.length > 0) {
        this.wsService.sendMessage(new Message({
          type: MessageTypes.CONTROL, command: MessageCommands.EXTRA_NETSTAT,
          body: {name: 'netstat', args: result}, hostname: this.hostname
        }));
      }
    });
  }

  cleanupHyperd() {
    this.wsService.sendMessage(new Message({
      type: MessageTypes.CONTROL, command: MessageCommands.CLEANUP_HYPERD, hostname: this.hostname
    }));
    this.loading.cleanup = true;
  }
}
