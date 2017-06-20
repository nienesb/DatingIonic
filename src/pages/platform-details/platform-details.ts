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
  public selectedDate: any = moment().hour(1).minute(0).toISOString();
  public endDate: any = moment(this.selectedDate).add(1, 'days').toISOString();
  public scoreArray: Array<number> = new Array<number>();
  public labelArray: Array<string> = new Array<string>();
  public dayOrMonth = 'day';

  constructor(public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatisticProvider) { }

  updateDate() {
    this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();
    console.log(this.selectedDate);
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
        this.scoreArray = [];
        this.labelArray = [];
        
        for(let prognostic of this.prognostics) {
          this.scoreArray.push(parseInt(prognostic.score));
          this.labelArray.push(prognostic.date.toString().substr(11, 2) + "U");
        }
        this.createCanvas(this.scoreArray, this.labelArray);
      }
    }, error => {
      console.log('Data gave error, not building canvas: ' + error);
    });
  }



  private createCanvas(scoreArray, labelArray) {
    if(scoreArray && labelArray && scoreArray.length > 0 && labelArray.length > 0) {

      this.lineCanvas  = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {labels: this.labelArray,
                datasets: [{
                  data: this.scoreArray,
                  label: "Score"
                }]
            }
      });
    }
  }
}
