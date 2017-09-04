import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../domain/user/user';
import { UserService } from '../../domain/user/user-service';
import { CardapioPage } from '../cardapio/cardapio';
import { HomePage } from '../home/home';
import { HistoricoPage } from '../historico/historico';
import { LoginPage } from '../login/login';
import { CreditosPage } from '../creditos/creditos';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage{


  tab1Root = HomePage;
  tab2Root = CardapioPage;
  tab3Root = CreditosPage;
  tab4Root = HistoricoPage;
  tab5Root = logout;

  constructor(
    public navCtrl: NavController,
    private _service: UserService){}

  get loggedUser(){
    return this._service.getLoggedUser();
  }

  logout(){
    this.navCtrl.setRoot(LoginPage)

  }


}
export class logout{
  constructor(public navCtrl: NavController){
    this.navCtrl.setRoot(LoginPage)
    this.navCtrl.popToRoot()
  }
}
