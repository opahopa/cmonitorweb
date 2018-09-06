import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientConfigComponent} from '../panel/pages/client-config/client-config.component';
import {ServersTableComponent} from '../panel/pages/servers-table/servers-table.component';
import {NavToolbarComponent} from './components/nav-toolbar/nav-toolbar.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {StatsPageComponent} from './pages/stats-page/stats-page.component';
import {ContactDonatePageComponent} from './pages/contact-donate-page/contact-donate-page.component';

const routes: Routes = [
  {
    path: '',
    component: NavToolbarComponent,
    // redirectTo: 'panel/server-list',
    children: [
      { path: '', redirectTo: 'server-list', pathMatch: 'full' },
      { path: 'server-list', component: ServersTableComponent },
      { path: 'client', component: ClientConfigComponent },
      { path: 'stats', component: StatsPageComponent},
      { path: 'profile', component:  ProfilePageComponent },
      { path: 'contact', component:  ContactDonatePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
