import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientConfigComponent} from './pages/client-config/client-config.component';
import {NavToolbarComponent} from './components/nav-toolbar/nav-toolbar.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {StatsPageComponent} from './pages/stats-page/stats-page.component';
import {ContactDonatePageComponent} from './pages/contact-donate-page/contact-donate-page.component';
import {NewsPageComponent} from './pages/news-page/news-page.component';
import {ManualComponent} from './pages/manual/manual.component';

const routes: Routes = [
  {
    path: '',
    component: NavToolbarComponent,
    children: [
      { path: '', redirectTo: 'servers', pathMatch: 'full' },
      { path: 'servers', loadChildren: './servers-table/servers-table.module#ServersTableModule' },
      { path: 'client', component: ClientConfigComponent },
      { path: 'stats', component: StatsPageComponent},
      { path: 'profile', component:  ProfilePageComponent },
      { path: 'contact', component:  ContactDonatePageComponent },
      { path: 'news', component:  NewsPageComponent },
      { path: 'manual', component:  ManualComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
