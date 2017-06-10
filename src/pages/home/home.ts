import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import {StatisticProvider} from "../../providers/statistic/statistic";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dailyTargets: {};

  constructor(public navCtrl: NavController, private http: Http, private statisticService: StatisticProvider) {

  }

  getDailyTargets() {
    this.statisticService.getDailyTargets().subscribe(stats => {
      this.dailyTargets = stats;
    })
  }

  ngOnInit(): void {
    this.getDailyTargets();
  }
}
