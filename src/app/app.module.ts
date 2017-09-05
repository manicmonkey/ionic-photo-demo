import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CameraPage } from "../pages/camera/camera";
import { KeyDefsPage } from "../pages/keydefs/keydefs";

import { Client } from "../services/rest/client";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { XsrfInterceptor } from "../services/rest/xsrf-interceptor";
import { LoginPage } from "../pages/login/login";
import { LogoutPage } from "../pages/logout/logout";
import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  HttpXsrfTokenExtractor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME
} from "./fork/xsrf";
import { UserSession } from "./usersession";
import { SettingsPage } from "../pages/settings/settings";
import { StatementPage } from "../pages/statements/statements";

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    HomePage,
    KeyDefsPage,
    StatementPage,
    ListPage,
    LoginPage,
    LogoutPage,
    SettingsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    HomePage,
    KeyDefsPage,
    StatementPage,
    ListPage,
    LoginPage,
    LogoutPage,
    SettingsPage,
  ],
  providers: [
    Camera,
    Client,
    UserSession,
    StatusBar,
    SplashScreen,
    HttpXsrfInterceptor,
    { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
    { provide: XSRF_COOKIE_NAME, useValue: 'DM-XSRF-TOKEN' },
    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsrfInterceptor,
      multi: true
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
