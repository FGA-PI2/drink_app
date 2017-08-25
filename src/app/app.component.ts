import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { QuerycodePage } from '../pages/querycode/querycode';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  public paginas = [
    {titulo: "Cardápio", componente: CardapioPage},
    {titulo: "Comprar Créditos", componente: CardapioPage},
    {titulo: "Histórico", componente: CardapioPage},
    {titulo: "Sair", componente: CardapioPage},
  ]
@ViewChild(Nav) public nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.push(page.componente)
  }
}
