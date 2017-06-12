import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {StatisticProvider} from "../../providers/statistic/statistic";
import {PlatformProvider} from "../../providers/platform/platform";
import {DailyStatPage} from "../daily-stat/daily-stat";
import {AddNotePage} from "../notities-pages/add-note/add-note";

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
  managers;
  partners;

  constructor(public navCtrl: NavController, private http: Http, private statsProvider: StatisticProvider, private platformsProvider: PlatformProvider) {
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

  getManagers() {
    this.statsProvider.getManagers().subscribe(stats => {
      this.managers = stats;
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
    this.navCtrl.setRoot(AddNotePage);
  }

  ngOnInit(): void {
    this.getPlatforms();
    this.getDailyTargets();
    this.getMonthlyPrognostic();
    this.getManagers();
    this.getPartners();
  }

  private getPartners() {
    this.statsProvider.getPartners().subscribe(partners => {
      this.partners = partners;
    });
  }
}
