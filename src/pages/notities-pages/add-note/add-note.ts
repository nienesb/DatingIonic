import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {NotitiesPage} from "../notities/notities";
import { HomePage } from "../../home/home";
import {DailyStatPage} from "../../daily-stat/daily-stat"
import { PlatformProvider } from "../../../providers/platform/platform"
import {PlatformDetailsPage} from "../../platform-details/platform-details";

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  notes: FirebaseListObservable<any>;
  noteTitle: string;
  noteNote: string;
  loading: Loading;
  platform;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.notes = af.list('/notes');
  }

  ngOnInit(): void {
    this.platform = this.navParams.get("platform");
    console.log(this.platform);
  }

  private addNote(title, note) {
    this.showLoading();
    if (this.platform) {
    this.notes.push({
      title: this.noteTitle,
      note: this.noteNote,
      stat: this.platform
    })} else {
      this.notes.push({
      title: this.noteTitle,
      note: this.noteNote
    })};
    this.navCtrl.setRoot(NotitiesPage);
  }

  private cancel (platform) {
    if (this.platform) {
      this.navCtrl.setRoot(PlatformDetailsPage, {platform: platform});
    } else {
      this.navCtrl.setRoot(NotitiesPage)};
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }
}
