import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AddNotePage } from "../add-note/add-note";
import {DetailNotePage} from "../detail-note/detail-note";

@IonicPage()
@Component({
  selector: 'page-notities',
  templateUrl: 'notities.html',

})

export class NotitiesPage {

  notes: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams, af: AngularFireDatabase) {
    this.notes = af.list('/notes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotitiesPage');
  }

  private openAddnote () {
    this.nav.setRoot(AddNotePage);
  }

  private deleteNote (note) {
    this.notes.remove(note);
  }

  private openDetailNote (note) {
    this.nav.push(DetailNotePage, {note: note});
  }

}
