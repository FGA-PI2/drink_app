import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrinkDetailPage } from './drink-detail';

@NgModule({
  declarations: [
    DrinkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DrinkDetailPage),
  ],
})
export class DrinkDetailPageModule {}
