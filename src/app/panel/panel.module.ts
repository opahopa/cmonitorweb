import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import {MessagesComponent} from './components/messages/messages.component';
import {NavToolbarComponent} from './components/nav-toolbar/nav-toolbar.component';
import {ClientConfigComponent} from './pages/client-config/client-config.component';
import {ServersTableComponent} from './pages/servers-table/servers-table.component';
import {WsStatusComponent} from './pages/servers-table/ws-status/ws-status.component';
import {MaterialModules} from '../core/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {ServicesStatusPipe} from '../pipes/services-status.pipe';
import { ServerDetailsComponent } from './pages/servers-table/server-details/server-details.component';
import { ServiceStateModalComponent } from './pages/servers-table/service-state-modal/service-state-modal.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ServerCodiusInfoComponent } from './pages/servers-table/server-codius-info/server-codius-info.component';
import { MbToGbPipe } from '../pipes/mb-to-gb.pipe';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {ChangeFeeModalComponent} from './pages/servers-table/change-fee-modal/change-fee-modal.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ContactDonatePageComponent } from './pages/contact-donate-page/contact-donate-page.component';
import { UploadTestModalComponent } from './pages/servers-table/upload-test-modal/upload-test-modal.component';
import { LogModalComponent } from './components/log-modal/log-modal.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ExtraServicesComponent } from './pages/servers-table/extra-services/extra-services.component';
import { ExtraServiceMenuComponent } from './pages/servers-table/extra-services/extra-service-menu/extra-service-menu.component';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModules,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxChartsModule
  ],
  declarations: [
    NavToolbarComponent,
    ClientConfigComponent,
    ServersTableComponent,
    MessagesComponent,
    WsStatusComponent,
    ServicesStatusPipe,
    ServerDetailsComponent,
    ServiceStateModalComponent,
    StatsPageComponent,
    ServerCodiusInfoComponent,
    ChangeFeeModalComponent,
    ProfilePageComponent,
    MbToGbPipe,
    ContactDonatePageComponent,
    UploadTestModalComponent,
    LogModalComponent,
    NewsPageComponent,
    ExtraServicesComponent,
    ExtraServiceMenuComponent,
    AlertComponent
  ],
  entryComponents: [
    ServiceStateModalComponent,
    ChangeFeeModalComponent,
    UploadTestModalComponent,
    LogModalComponent,
    ExtraServiceMenuComponent,
    AlertComponent
  ]
})
export class PanelModule {}
