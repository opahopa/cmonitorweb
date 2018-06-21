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
    WsStatusComponent
  ]
})
export class PanelModule {}
