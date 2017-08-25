import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'admin.html'
})
export class AdminPage {

  tab1Root = MenuPage;
  tab2Root = MenuPage;
  tab3Root = MenuPage;

  constructor() {

  }
}
