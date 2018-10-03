import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import {NavToolbarComponent} from './components/nav-toolbar/nav-toolbar.component';
import {ClientConfigComponent} from './pages/client-config/client-config.component';
import {MaterialModulesCommon} from '../core/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import { ContactDonatePageComponent } from './pages/contact-donate-page/contact-donate-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ManualComponent } from './pages/manual/manual.component';
import {MatSidenavModule, MatTreeModule} from '@angular/material';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModulesCommon,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSidenavModule,
    ChartsModule,
    MatTreeModule
  ],
  declarations: [
    NavToolbarComponent,
    ClientConfigComponent,
    StatsPageComponent,
    ProfilePageComponent,
    ContactDonatePageComponent,
    NewsPageComponent,
    ManualComponent
  ]
})
export class PanelModule {}
