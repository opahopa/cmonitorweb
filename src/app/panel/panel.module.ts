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

@NgModule({
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModules,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavToolbarComponent,
    ClientConfigComponent,
    ServersTableComponent,
    MessagesComponent,
    WsStatusComponent,
    ServicesStatusPipe,
    ServerDetailsComponent,
    ServiceStateModalComponent
  ],
  entryComponents: [
    ServiceStateModalComponent
  ]
})
export class PanelModule {}
