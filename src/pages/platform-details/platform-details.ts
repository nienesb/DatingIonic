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
  public convertedSelectedDate: string;
  public convertedEndDate: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatisticProvider) { }

  updateDate() {
    this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();

    this.convertedSelectedDate = this.convertDate(this.selectedDate);
    this.convertedEndDate = this.convertDate(this.endDate);

    this.getPrognostics(this.platform.id, this.convertedSelectedDate, this.convertedEndDate);
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PlatformDetailsPage');
    console.log('Date: ' + this.selectedDate);
    console.log('convertedDate: ' + this.convertDate(this.selectedDate));

    this.convertedSelectedDate = this.convertDate(this.selectedDate);
    this.convertedEndDate = this.convertDate(this.endDate);

    this.getPrognostics(this.platform.id, this.convertedSelectedDate, this.convertedEndDate);

  }

  getPrognostics(platformId, start, end) {
    this.statsProvider.getDailyPrognosticForPlatform(platformId, start, end).subscribe((data) => {
      this.prognostics = data;
      console.log(data)
    });
  }
  
  private convertDate(date: any) {
    if(date) {
      let tempDate = date.toString();
      tempDate = tempDate.replace(/T/g, '%20');
      tempDate = tempDate.replace(/:/g, '%3A');
      tempDate = tempDate.substr(0, 25);

      return tempDate;
    }
  }


}
