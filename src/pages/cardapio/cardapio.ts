import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardapioService } from '../../domain/cardapio/cardapio-service';
import { Cardapio } from '../../domain/cardapio/cardapio';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  public cardapio: Cardapio[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cardapioService: CardapioService) {

      this.cardapio = _cardapioService.cardapio();
    }


}
