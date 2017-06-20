import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/nl';
import {StatisticProvider} from "../../providers/statistic/statistic";
import { Chart } from 'chart.js';


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
  @ViewChild('lineCanvas') lineCanvas;
  public prognostics;
  public platform = this.navParams.get("platform");
  public selectedDate: any = moment().toISOString();
  public endDate: any = moment(this.selectedDate).add(1, 'days').toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatisticProvider) { }

  updateDate() {
    this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();

    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate);
  }

  ionViewDidLoad()
  {
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate)
  }

  getPrognostics(platformId, start, end) {
    this.statsProvider.getDailyPrognosticForPlatform(platformId, start, end).subscribe((data) => {
      if(data) {
        this.prognostics = data;
        this.createCanvas(this.prognostics);
      }
    }, error => {
      console.log('Data gave error, not building canvas: ' + error);
    });
  }

  

  private createCanvas(prognostics: any) {
    if(prognostics) {
      let scoreArray: Array<number> = new Array<number>();
      let labelArray: Array<string> = new Array<string>();

      for(let prognostic of prognostics) {
        console.log(prognostic);
        scoreArray.push(parseInt(prognostic.score));
        labelArray.push(prognostic.date.toString());
      }

      console.log(scoreArray);
      console.log(labelArray);
      
      this.lineCanvas  = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {labels: [labelArray],
                datasets: [{
                  data: scoreArray,
                  label: "Score"
                }]
            }
      });
    }
  }
}
