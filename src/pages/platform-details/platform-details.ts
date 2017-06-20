import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/nl';


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
  public selectedDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlatformDetailsPage');
    console.log('Date: ' + this.selectedDate);
  }

}
