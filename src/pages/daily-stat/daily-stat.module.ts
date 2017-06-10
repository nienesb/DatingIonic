import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyStatPage } from './daily-stat';

@NgModule({
  declarations: [
    DailyStatPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyStatPage),
  ],
  exports: [
    DailyStatPage
  ]
})
export class DailyStatPageModule {}
