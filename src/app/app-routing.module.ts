import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'panel/server-list', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
