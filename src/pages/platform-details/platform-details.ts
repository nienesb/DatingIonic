import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/nl';
import {StatisticProvider} from "../../providers/statistic/statistic";


/**
 * Generated class for the PlatformDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-platform-details',
  templateUrl: 'platform-details.html',
})
export class PlatformDetailsPage {
  public prognostics;
  public platform = this.navParams.get("platform");
  public selectedDate: any = moment().toISOString();
  public endDate: any = moment(this.selectedDate).add(1, 'days').toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatisticProvider) {
  }

  updateDate() {
    this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate);
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PlatformDetailsPage');
    console.log('Date: ' + this.selectedDate);
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate);

  }

  getPrognostics(platformId, start, end) {
    this.statsProvider.getDailyPrognosticForPlatform(platformId, start, end).subscribe((data) => {
      this.prognostics = data;
      console.log(data)
    });
  }


}
