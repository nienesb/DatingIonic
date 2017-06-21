import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DailyStatPage} from "../../daily-stat/daily-stat";

/**
 * Generated class for the DetailNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-note',
  templateUrl: 'detail-note.html',
})
export class DetailNotePage {

  note;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.note = this.navParams.get("note");
    console.log(this.note);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNotePage');
  }

  private openStat (note) {
    console.log(note);
    if(note.stat && note.stat.platform) {
      this.navCtrl.push(DailyStatPage, {dailyStat: note.stat});
    }
  }
}
