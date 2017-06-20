import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {StatisticProvider} from "../../providers/statistic/statistic";
import {PlatformProvider} from "../../providers/platform/platform";
import { PlatformDetailsPage } from "../platform-details/platform-details";
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
  platforms;


  constructor(public navCtrl: NavController, private http: Http, private statsProvider: StatisticProvider, private platformsProvider: PlatformProvider) {
  }

  getPlatforms() {
    this.platformsProvider.getPlatforms().subscribe(platforms => {
      this.platforms = platforms;
    });
  }

  openDetailPage(platform) {
    this.navCtrl.push(PlatformDetailsPage, {platform: platform});
  }

  openNotes(dailyStat) {
    this.navCtrl.setRoot(AddNotePage);
  }

  ngOnInit(): void {
    this.getPlatforms();
  }

}
