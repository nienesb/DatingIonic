
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DailyStatPage } from '../pages/daily-stat/daily-stat';
import { PlatformDetailsPage } from '../pages/platform-details/platform-details';
import { NotitiesPage } from "../pages/notities-pages/notities/notities";
import { AddNotePage } from "../pages/notities-pages/add-note/add-note";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import { StatisticProvider } from '../providers/statistic/statistic';
import { HttpModule } from "@angular/http";
import { PlatformProvider } from '../providers/platform/platform';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import {DetailNotePage} from "../pages/notities-pages/detail-note/detail-note";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAeIcw7rfiIw268XybNvY9FPRalM8SkdEc",
  authDomain: "dating-ionic.firebaseapp.com",
  databaseURL: "https://dating-ionic.firebaseio.com",
  projectId: "dating-ionic",
  storageBucket: "dating-ionic.appspot.com",
  messagingSenderId: "347303628921"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DailyStatPage,
    NotitiesPage,
    AddNotePage,
    DetailNotePage,
    PlatformDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DailyStatPage,
    NotitiesPage,
    AddNotePage,
    DetailNotePage,
    PlatformDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatisticProvider,
    PlatformProvider
  ]
})
export class AppModule {}


