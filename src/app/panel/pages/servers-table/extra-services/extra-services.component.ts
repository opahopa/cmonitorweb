import {Component, Input, OnInit} from '@angular/core';
import {ServiceState} from '../../../models/service-state';
import {ExtraServiceMenuComponent} from './extra-service-menu/extra-service-menu.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {InfoModalsService} from '../../../services/info-modals.service';
import {NetstatComponent} from './netstat/netstat.component';
import {Message, MessageCommands, MessageStatus, MessageTypes} from '../../../models/message';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {WSEvent} from '../../../models/enums/wsevent.enum';
import {HyperdComponent} from '../hyperd/hyperd.component';

@Component({
  selector: 'app-extra-services',
  templateUrl: './extra-services.component.html',
  styleUrls: ['./extra-services.component.scss']
})
export class ExtraServicesComponent implements OnInit {
  @Input() extra_services?: ServiceState[];
  @Input() hostname: string;
  @Input() hyperd: any;
  service: ServiceState;

  constructor(public dialog: MatDialog, private modals: InfoModalsService, private wsService: WebsocketService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.wsService.watchEvent(WSEvent.MESSAGE).subscribe((data) => {
      const msg: Message = <Message>JSON.parse(data.data);

      if (msg.type === MessageTypes.REPORT) {
        if (msg.command === MessageCommands.CLEANUP_HYPERD
          && msg.status === MessageStatus.OK) {
          this.snackBar.open('Hyperd Cleanup Successful', '', {duration: 3000, });
        }
        if (msg.command === MessageCommands.CLEANUP_HYPERD
          && msg.status === MessageStatus.ERROR) {
          this.snackBar.open('Hyperd Cleanup Fail', '', {duration: 3000, });
        }
        if (msg.command === MessageCommands.HYPERD_RM_POD
          && msg.status === MessageStatus.OK) {
          this.snackBar.open('Hyperctl remove pod/s Successful', '', {duration: 3000, });
        }
        if (msg.command === MessageCommands.HYPERD_RM_POD
          && msg.status === MessageStatus.ERROR) {
          this.snackBar.open('Hyperd remove pod/s Fail', '', {duration: 3000, });
        }
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

  openHyperd() {
    const m = this.dialog.open(HyperdComponent, {
      data: {hyperd: this.hyperd, hostname: this.hostname},
      width: '95vw',
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
    m.afterClosed().subscribe(result => {
      if (result.pods.length > 0) {
        this.wsService.sendMessage(new Message({
          type: MessageTypes.CONTROL, command: MessageCommands.HYPERD_RM_POD,
          body: {pods: result.pods, all: result.all}, hostname: this.hostname
        }));
      }
    });
  }
}
