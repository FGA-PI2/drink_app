import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuAdminPage } from './menu-admin';

@NgModule({
  declarations: [
    MenuAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuAdminPage),
  ],
})
export class MenuAdminPageModule {}
