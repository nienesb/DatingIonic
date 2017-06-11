import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-daily-stat',
  templateUrl: 'daily-stat.html',
})
export class DailyStatPage {

  @ViewChild('barCanvas') barCanvas;

  dailyStat;

  barChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(): void {
    this.dailyStat = this.navParams.get("dailyStat");
    console.log(this.dailyStat);
  }

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Score", "Target", "proceeds Target", "proceeds Prognostic"],
        datasets: [{
          label: this.dailyStat.platform.name,
          data: [this.dailyStat.score, 100, this.dailyStat.proceedsTarget, this.dailyStat.proceedsPrognostic],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }
}
