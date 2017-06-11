import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNotePage } from './add-note';

@NgModule({
  declarations: [
    AddNotePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNotePage),
  ],
  exports: [
    AddNotePage
  ]
})
export class AddNotePageModule {}
