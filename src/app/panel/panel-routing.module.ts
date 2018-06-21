import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientConfigComponent} from '../panel/pages/client-config/client-config.component';
import {ServersTableComponent} from '../panel/pages/servers-table/servers-table.component';
import {NavToolbarComponent} from './components/nav-toolbar/nav-toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavToolbarComponent,
    // redirectTo: 'panel/server-list',
    children: [
      { path: '', redirectTo: 'server-list', pathMatch: 'full' },
      { path: 'server-list', component: ServersTableComponent },
      { path: 'client', component: ClientConfigComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
