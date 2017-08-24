import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { CardapioService } from '../../domain/cardapio/cardapio-service';
import { UserService } from '../../domain/user/user-service';
import { Cardapio } from '../../domain/cardapio/cardapio';
import { DrinkDetailPage } from '../../pages/drink-detail/drink-detail';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  public cardapio: Cardapio[];
  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cardapioService: CardapioService,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _userService: UserService,
    public modalCtrl: ModalController

  ) {

      this.cardapio = _cardapioService.cardapio();
    }

    buyDrink(item){
      let modal = this.modalCtrl.create(DrinkDetailPage, item);
      modal.present();
    }

    processDrink(item) {
      let user = this._userService.getLoggedUser()
      if(user.creditos < item.preco){
        let alert = this._alertCtrl.create({
          title: 'OPS!',
          subTitle: 'Você não possui créditos suficiente!',
          buttons: ['OK']
        });
        alert.present();
    } else {
      this._userService.updateCreditos(item.preco, false);
      let alert = this._alertCtrl.create({
        title: 'Sucesso!',
        subTitle: 'Sua Bebida foi comprada!',
        buttons: ['OK']
      });
      alert.present();
    }
    }

}
