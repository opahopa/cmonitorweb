import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServersTableComponent} from './components/servers-table.component';
import {ServerPanelComponent} from './server-panel/server-panel.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ServersTableComponent},
      { path: ':hostname', component: ServerPanelComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServersTableRoutingModule { }
