import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {StatisticProvider} from "../../providers/statistic/statistic";
import { PlatformProvider} from "../../providers/platform/platform";
import { PlatformDetailsPage } from "../platform-details/platform-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
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

  ngAfterViewInit() {
    this.navCtrl.viewDidEnter.subscribe((data) => {
      this.getPlatforms();
    });
  }

}
