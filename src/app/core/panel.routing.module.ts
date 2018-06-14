import { AuthGuard } from '../core/auth.guard';
import {NavToolbarComponent} from '../components/nav-toolbar/nav-toolbar.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServersTableComponent} from '../components/servers-table/servers-table.component';
import {ClientConfigComponent} from '../pages/client-config/client-config.component';

const panelRoutes: Routes = [
  {
    path: 'panel',
    component: NavToolbarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: '/server-list', pathMatch: 'full'  },
          { path: 'server-list', component: ServersTableComponent },
          { path: 'client', component: ClientConfigComponent },
        ],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(panelRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class  PanelRoutingModule {}
