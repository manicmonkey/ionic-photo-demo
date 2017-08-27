import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CameraPage} from "../pages/camera/camera";
import {KeyDefsPage} from "../pages/keydefs/keydefs";

import {Client} from "../services/rest/client";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {XsrfInterceptor} from "../services/rest/xsrf-interceptor";
import {LoginPage} from "../pages/login/login";
import {LogoutPage} from "../pages/logout/logout";

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    HomePage,
    KeyDefsPage,
    ListPage,
    LoginPage,
    LogoutPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'DM-XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    HomePage,
    KeyDefsPage,
    ListPage,
    LoginPage,
    LogoutPage,
  ],
  providers: [
    Camera,
    Client,
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsrfInterceptor,
      multi: true
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
