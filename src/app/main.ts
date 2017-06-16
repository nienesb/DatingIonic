import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { DailyStatPage } from '../pages/daily-stat/daily-stat';
import { NotitiesPage } from '../pages/notities-pages/notities/notities';
import { LoginPage } from "../pages/login/login";

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  private rootPage;
  private homePage;
  private statsPage;
  private notesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = LoginPage;
    this.homePage = HomePage;
    this.statsPage = DailyStatPage;
    this.notesPage = NotitiesPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}

platformBrowserDynamic().bootstrapModule(AppModule);
