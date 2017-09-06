import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';


@IonicPage()
@Component({
  selector: 'page-creditos',
  templateUrl: 'creditos.html',
})
export class CreditosPage {

  private _credits: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _userService: UserService, private _alertCtrl: AlertController) {
  }


  buyCredits(){
    this._alertCtrl.create({
      title: 'Atenção!',
      buttons: [{ text: 'Cancelar' },{ text: 'OK', handler: () => {
        this._userService.updateCreditos(this._credits, true);
      }}],
      subTitle: `Deseja comprar R$${this._credits},00 de créditos?`
    }).present();
  }
}
