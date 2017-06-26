import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {PlatformDetailsPage} from "../../platform-details/platform-details";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {NotitiesPage} from "../notities/notities";

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
  public notes: FirebaseListObservable<any>;
  public edit = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase,
              public alertCtrl: AlertController) {
    this.notes = af.list('/notes');
  }

  ngOnInit(): void {
    this.note = this.navParams.get("note");
    console.log(this.note);
  }

  public setEdit() {
    this.edit = !this.edit;
  }

  public editNote (note) {
    this.notes.update(note, {
      title: this.note.title,
      note: this.note.note
    });

    this.setEdit();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNotePage');
  }

  public deleteNote (note) {
    this.notes.remove(note);
    this.navCtrl.push(NotitiesPage);
  }

  public confirmDelete(note) {
    let alert = this.alertCtrl.create({
      title: 'Verwijderen?',
      message: 'Weet je zeker dat je deze notitie wil verwijderen?',
      buttons: [
        {
          text: 'Nee',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ja',
          handler: () => {
            this.deleteNote(note);
          }
        }
      ]
    });
    alert.present();
  }

  public openStat (note) {
    console.log(note);
    if(note.stat) {
      this.navCtrl.push(PlatformDetailsPage, {platform: note.stat});
    }
  }
}
