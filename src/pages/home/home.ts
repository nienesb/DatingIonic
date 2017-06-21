import { Component } from '@angular/core';
import { AlertController, NavController, Loading, LoadingController } from 'ionic-angular';
import {Http} from "@angular/http";
import {StatisticProvider} from "../../providers/statistic/statistic";
import {PlatformProvider} from "../../providers/platform/platform";
import {DailyStatPage} from "../daily-stat/daily-stat";
import {AddNotePage} from "../notities-pages/add-note/add-note";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`
    h2{
      font-weight: bold;
    }
  `]
})

export class HomePage {
  dailyPrognostic;
  monthlyPrognostic;
  platforms;
  showPage;

  loading: Loading;
  notes: FirebaseListObservable<any>;
  noteTitle: string;
  noteNote: string;

  constructor(public navCtrl: NavController, private http: Http, private statsProvider: StatisticProvider, private alertCtrl: AlertController,
              private platformsProvider: PlatformProvider, private loadingCtrl: LoadingController) {
    this.showPage = "dailyPrognostic";
  }

  getDailyTargets() {
    this.statsProvider.getDailyPrognostics().subscribe(stats => {
      this.dailyPrognostic = stats;
      this.addPlatformsToStats();
    })
  }

  getMonthlyPrognostic() {
    this.statsProvider.getMonthlyPrognostic().subscribe(stats => {
      this.monthlyPrognostic = stats;
    })
  }

  private addPlatformsToStats() {
    for (let dailyTarget of this.dailyPrognostic) {
      for (let platform of this.platforms) {
        if (dailyTarget.platformId == platform.id) {
          dailyTarget.platform = platform;
        }
      }
    }
  }

  getPlatforms() {
    this.platformsProvider.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });
    console.log(this.platforms);
  }

  openDetailPage(dailyStat) {
    this.navCtrl.push(DailyStatPage, {dailyStat: dailyStat});
  }

  openNotes(dailyStat) {
    this.navCtrl.push(AddNotePage, {dailyStat: dailyStat});
  }

  ngOnInit(): void {
    this.getPlatforms();
    this.getDailyTargets();
    this.getMonthlyPrognostic();
  }

}
