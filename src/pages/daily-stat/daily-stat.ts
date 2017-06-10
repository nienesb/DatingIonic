import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DailyStatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-stat',
  templateUrl: 'daily-stat.html',
})
export class DailyStatPage {

  dailyStat: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyStatPage');
  }

  ngOnInit(): void {
    this.dailyStat = this.navParams.get("dailyStat");
    console.log(this.dailyStat);
  }
}
