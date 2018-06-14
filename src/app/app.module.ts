import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModules } from './core/material.module';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './components/messages/messages.component';
import { ServersTableComponent } from './components/servers-table/servers-table.component';
import { NavToolbarComponent } from './components/nav-toolbar/nav-toolbar.component';;
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ClientConfigComponent } from './pages/client-config/client-config.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {PanelRoutingModule} from './core/panel.routing.module';
import {AuthGuard} from './core/auth.guard';
import {JwtInterceptor} from './core/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ServersTableComponent,
    NavToolbarComponent,
    PageNotFoundComponent,
    ClientConfigComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    PanelRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModules,
    FlexLayoutModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
