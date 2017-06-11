import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotitiesPage } from './notities';

@NgModule({
  declarations: [
    NotitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(NotitiesPage),
  ],
  exports: [
    NotitiesPage
  ]
})
export class NotitiesPageModule {}
