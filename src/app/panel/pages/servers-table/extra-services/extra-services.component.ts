import {Component, Input, OnInit} from '@angular/core';
import {ServiceState} from '../../../models/service-state';
import {ExtraServiceMenuComponent} from './extra-service-menu/extra-service-menu.component';
import {MatDialog} from '@angular/material';
import {AlertComponent} from '../../../components/alert/alert.component';
import {InfoModalsService} from '../../../services/info-modals.service';

@Component({
  selector: 'app-extra-services',
  templateUrl: './extra-services.component.html',
  styleUrls: ['./extra-services.component.scss']
})
export class ExtraServicesComponent implements OnInit {
  @Input() extra_services?: ServiceState[];
  @Input() hostname: string;
  service: ServiceState;

  constructor(public dialog: MatDialog, private modals: InfoModalsService) { }

  ngOnInit() {

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
          data: { service: service, hostname: this.hostname },
          minWidth: '35vw'
        });
      } else {
        this.modals.openAlert(alert);
      }
    } else {
      this.modals.openAlert(alert);
    }
  }
}
