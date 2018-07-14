import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';
import {AuthGuard} from './core/auth.guard';
import {RegisterFormComponent} from './pages/register-form/register-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/panel/server-list', pathMatch: 'full' },
  { path: 'panel', loadChildren: '../app/panel/panel.module#PanelModule', canLoad: [AuthGuard]},
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
