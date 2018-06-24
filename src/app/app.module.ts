import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModules } from './core/material.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './core/auth.guard';
import {JwtInterceptor} from './core/jwt.interceptor';
import {APP_CONFIG, AppConfig} from './app.config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServicesStatusPipe } from './pipes/services-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModules,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    {provide: APP_CONFIG, useValue: AppConfig},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
