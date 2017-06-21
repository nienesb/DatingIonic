import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/nl';
import {StatisticProvider} from "../../providers/statistic/statistic";
import {Chart} from 'chart.js';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatisticProvider, public toastCtrl: ToastController) { }

  updateDate() {
    if(this.dayOrMonth == 'day') {
      this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();
    }
    else {
        //this.selectedDate = moment(this.selectedDate).startOf('month').toISOString();
        this.endDate = moment(this.selectedDate).add(1, 'month').toISOString();
    }
    console.log(this.selectedDate);
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate);

  }

  ionViewDidLoad() {
    this.createCanvas(this.scoreArray, this.labelArray);
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate)
  }

  getPrognostics(platformId, start, end) {
    if(this.dayOrMonth == 'day') {
      this.statsProvider.getDailyPrognosticForPlatform(platformId, start, end).subscribe((data) => {
        if(data) {
          this.prognostics = data;
          this.scoreArray = [];
          this.labelArray = [];

          if(data.length > 0) {
            for (let prognostic of this.prognostics) {
              this.scoreArray.push(parseInt(prognostic.score));
              this.labelArray.push(prognostic.date.toString().substr(11, 2) + "U");
            }
            this.addData(this.lineCanvas, this.labelArray, this.scoreArray);
          } else {
            this.showToast('Geen data gevonden');
          }
        }
      }, error => {
        this.showToast('Er is iets fout gegaan bij het ophalen van data.');
      });
    }
    else {
      this.statsProvider.getMonthlyPrognosticForPlatform(platformId, start, end).subscribe((data) => {
        if(data) {
          this.prognostics = data;
          this.scoreArray = [];
          this.labelArray = [];

          if(data.length > 0) {
            for (let prognostic of this.prognostics) {
              this.scoreArray.push(parseInt(prognostic.averageProceedsDailyPercentage));
              this.labelArray.push(moment(prognostic.date).format('MMM Do'));
            }
            this.addData(this.lineCanvas, this.labelArray, this.scoreArray);
          } else {
            this.showToast('Geen data gevonden');
          }

        }
      }, error => {
        this.showToast('Er is iets fout gegaan bij het ophalen van data.');
      });
    }
  }

  private addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].data = data;
    chart.update();
  }

  private createCanvas(scoreArray, labelArray) {

    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labelArray,
        datasets: [{
          data: this.scoreArray,
          label: "Score"
        }]
      }
    });
  }

  private showToast(messageString: string) {
    let toast = this.toastCtrl.create({
      message: messageString,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}