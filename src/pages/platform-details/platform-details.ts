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
  public selectedDate: any = moment().toISOString();
  public endDate: any = moment(this.selectedDate).add(1, 'days').toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  updateDate() {
    this.endDate = moment(this.selectedDate).add(1, 'days').toISOString();
    console.log('~~~~Updated endDate~~~~');
    console.log('endDate: ' + this.endDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlatformDetailsPage');
    console.log('selectedDate: ' + this.selectedDate);
    console.log('endDate: ' + this.endDate);
  }

}
