import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {StatisticProvider} from "../../providers/statistic/statistic";
import {PlatformProvider} from "../../providers/platform/platform";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dailyTargets;
  platforms;

  constructor(public navCtrl: NavController, private http: Http, private statsProvider: StatisticProvider, private platformsProvider: PlatformProvider) {

  }

  getDailyTargets() {
    this.statsProvider.getDailyTargets().subscribe(stats => {
      this.dailyTargets = stats;
      this.addPlatformsToStats();
    })
  }

  private addPlatformsToStats() {
    for (let dailyTarget of this.dailyTargets) {
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
    })
    console.log(this.platforms);
  }

  openDetailPage(dailyStat) {
    alert('hier wordt er een nieuwe pagina geopend');
  }

  ngOnInit(): void {
    this.getPlatforms();
    this.getDailyTargets();
  }
}
