import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';


@IonicPage()
@Component({
  selector: 'page-creditos',
  templateUrl: 'creditos.html',
})
export class CreditosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private stripe: Stripe, private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
    this.stripe.setPublishableKey('pk_live_Dih9yyqPB6gXqQ47X2NSt1Iw');

let card = {
 number: '4242424242424242',
 expMonth: 12,
 expYear: 2020,
 cvc: '220'
};

this.stripe.createCardToken(card)
   .then(token => this.show(token))
   .catch(error => this.show(error));
  }


  show(msg){
    var alert = this._alertCtrl.create({
      title: 'ATENÇÃO!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
