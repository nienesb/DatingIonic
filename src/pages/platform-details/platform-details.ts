import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/nl';
import {StatisticProvider} from "../../providers/statistic/statistic";
import {Chart} from 'chart.js';
import {AddNotePage} from "../notities-pages/add-note/add-note";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {DetailNotePage} from "../notities-pages/detail-note/detail-note";


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
  @ViewChild('barCanvas') barCanvas;
  public prognostics;
  public platform = this.navParams.get("platform");
  public selectedDate: any = moment().hour(1).minute(0).toISOString();
  public endDate: any = moment(this.selectedDate).add(1, 'days').toISOString();
  public scoreArray: Array<number> = new Array<number>();
  public labelArray: Array<string> = new Array<string>();

  public statsArray: Array<number> = new Array<number>();
  public barLabelArray: Array<String> = new Array<String>();

  public dayOrMonth = 'day';
  notes: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatisticProvider,
              public toastCtrl: ToastController, af: AngularFireDatabase) {
    this.notes = af.list('/notes');
  }

  updateDate() {
    if (this.dayOrMonth == 'day') {
      this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();
    }
    else {
      let beforeDate = this.selectedDate;
      this.selectedDate = moment(beforeDate).set('date', 2).toISOString();
      this.endDate = moment(this.selectedDate).add(1, 'month').toISOString();
    }
    console.log(this.selectedDate);
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate);

  }

  ionViewDidLoad() {
    this.createCanvas(this.scoreArray, this.labelArray);
    this.createBarCanvas(this.statsArray, this.barLabelArray);
    this.getPrognostics(this.platform.id, this.selectedDate, this.endDate)
  }

  getPrognostics(platformId, start, end) {
    if (this.dayOrMonth == 'day') {
      this.statsProvider.getDailyPrognosticForPlatform(platformId, start, end).subscribe((data) => {
        if (data) {
          this.prognostics = data;
          this.scoreArray = [];
          this.labelArray = [];

          if (data.length > 0) {
            this.updateLineChartForDailyPrognostics();
            this.createBarGraph(data);
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
        if (data) {
          this.prognostics = data;
          this.scoreArray = [];
          this.labelArray = [];
          this.statsArray = [];
          this.barLabelArray = [];

          if (data.length > 0) {
            this.updateLineChartForMonthlyPrognostics();
            this.createBarGraph(data);
          } else {
            this.showToast('Geen data gevonden');
          }

        }
      }, error => {
        this.showToast('Er is iets fout gegaan bij het ophalen van data.');
      });
    }
  }

  private updateLineChartForDailyPrognostics() {
    for (let prognostic of this.prognostics) {
      this.scoreArray.push(parseInt(prognostic.profitPercentage));
      this.labelArray.push(prognostic.date.toString().substr(11, 2) + "U");
    }
    this.addData(this.lineCanvas, this.labelArray, this.scoreArray, "Profit %");
  }

  private updateLineChartForMonthlyPrognostics() {
    for (let prognostic of this.prognostics) {
      this.scoreArray.push(parseInt(prognostic.averageProceedsDailyPercentage));
      this.labelArray.push(moment(prognostic.date).format('MMM Do'));
    }
    this.addData(this.lineCanvas, this.labelArray, this.scoreArray, "Profit %");
  }

  private addData(chart, label, data, dataLabel) {

    chart.data.labels = label;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = dataLabel;
    chart.update();
  }

  private createCanvas(scoreArray, labelArray) {

    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labelArray,
        datasets: [{
          data: this.scoreArray,
          label: "Profit %"
        }]
      }
    });
  }

  private createBarCanvas(statsArray, labelArray) {
    this.barCanvas = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: labelArray,
        datasets: [{
          label: this.platform.name,
          data: statsArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
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

  openNotes(platform) {
    this.navCtrl.push(AddNotePage, {platform: platform});
  }

  openDetailNote(note) {
    this.navCtrl.push(DetailNotePage, {note: note});
  }


  private createBarGraph(prognostics) {
    let highestProfitPercentage = null;
    let lowestProfitPercentage = null;
    let highestScore = null;
    let lowestScore = null;

    for (let prognostic of prognostics) {
      if (this.dayOrMonth == 'day') {
        if (parseInt(prognostic.profitPercentage) < lowestProfitPercentage || lowestProfitPercentage == null) {
          lowestProfitPercentage = parseInt(prognostic.profitPercentage);
        }
        if (parseInt(prognostic.profitPercentage) > highestProfitPercentage || highestProfitPercentage == null) {
          highestProfitPercentage = parseInt(prognostic.profitPercentage);
        }
        if (parseInt(prognostic.score) < lowestScore || lowestScore == null) {
          lowestScore = parseInt(prognostic.score);
        }
        if (parseInt(prognostic.score) > highestScore || highestScore == null) {
          highestScore = parseInt(prognostic.score);
        }
      }
      else {
        if (parseInt(prognostic.averageProceedsDailyPercentage) < lowestProfitPercentage|| lowestProfitPercentage == null) {
          lowestProfitPercentage = parseInt(prognostic.averageProceedsDailyPercentage);
        }
        if (parseInt(prognostic.averageProceedsDailyPercentage) > highestProfitPercentage || highestProfitPercentage == null) {
          highestProfitPercentage = parseInt(prognostic.averageProceedsDailyPercentage);
        }
        if (parseInt(prognostic.proceedsToday) < lowestScore || lowestScore == null) {
          lowestScore = parseInt(prognostic.proceedsToday);
        }
        if (parseInt(prognostic.proceedsToday) > highestScore || highestScore == null) {
          highestScore = parseInt(prognostic.proceedsToday);
        }
      }
    }

    this.statsArray = [];
    this.statsArray.push(lowestProfitPercentage);
    this.statsArray.push(highestProfitPercentage);
    this.statsArray.push(lowestScore);
    this.statsArray.push(highestScore);
    this.barLabelArray = ['L. Profit',
      'H. Profit',
      'L. Score',
      'H. Score'];
    this.addData(this.barCanvas, this.barLabelArray, this.statsArray, this.platform.name);
  }
}
