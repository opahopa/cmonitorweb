import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';
import {AuthGuard} from './core/auth.guard';
import {RegisterFormComponent} from './pages/register-form/register-form.component';
import {ConfirmEmailComponent} from './pages/confirm-email/confirm-email.component';


const routes: Routes = [
  { path: '', redirectTo: '/panel/servers', pathMatch: 'full' },
  { path: 'panel', loadChildren: '../app/panel/panel.module#PanelModule', canLoad: [AuthGuard]},
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
