import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServicesStatusPipe} from '../../pipes/services-status.pipe';
import {MbToGbPipe} from '../../pipes/mb-to-gb.pipe';
import {UptimePipe} from '../pipes/uptime.pipe';
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule
} from '@angular/material';
import {ServersTableRoutingModule} from './servers-table-routing.module';
import {WsStatusComponent} from './components/ws-status/ws-status.component';
import {ServersTableComponent} from './components/servers-table.component';
import {ServerDetailsComponent} from './components/server-details/server-details.component';
import {ServiceStateModalComponent} from './components/service-state-modal/service-state-modal.component';
import {ServerCodiusInfoComponent} from './components/server-codius-info/server-codius-info.component';
import {ChangeFeeModalComponent} from './components/change-fee-modal/change-fee-modal.component';
import {ExtraServicesComponent} from './components/extra-services/extra-services.component';
import {ExtraServiceMenuComponent} from './components/extra-services/extra-service-menu/extra-service-menu.component';
import {HyperdComponent} from './components/hyperd/hyperd.component';
import {CodiusVariablesComponent} from './components/server-codius-info/codius-variables/codius-variables.component';
import {NetstatComponent} from './components/extra-services/netstat/netstat.component';
import {MaterialModulesCommon} from '../../core/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import { ServerPanelComponent } from './server-panel/server-panel.component';
import { ServiceStatsComponent } from './server-panel/services-stats/services-stats.component';
import {ChartsModule} from 'ng2-charts';
import { ServiceActivityComponent } from './server-panel/services-stats/service-activity/service-activity.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModulesCommon,
    ServersTableRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    ChartsModule,
  ],
  declarations: [
    ServersTableComponent,
    WsStatusComponent,
    ServicesStatusPipe,
    ServerDetailsComponent,
    ServiceStateModalComponent,
    ServerCodiusInfoComponent,
    ChangeFeeModalComponent,
    MbToGbPipe,
    ExtraServicesComponent,
    ExtraServiceMenuComponent,
    UptimePipe,
    CodiusVariablesComponent,
    NetstatComponent,
    HyperdComponent,
    ServerPanelComponent,
    ServiceStatsComponent,
    ServiceActivityComponent,
  ],
  entryComponents: [
    ServiceStateModalComponent,
    ChangeFeeModalComponent,
    ExtraServiceMenuComponent,
    CodiusVariablesComponent,
    NetstatComponent,
    HyperdComponent
  ]
})
export class ServersTableModule { }
