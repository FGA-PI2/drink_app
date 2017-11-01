import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-creditos',
  templateUrl: 'creditos.html',
})
export class CreditosPage {

  private _credits: number;
	payment: PayPalPayment = new PayPalPayment('', 'BRL', 'Credits', 'sale');
	payPalEnvironment: string = 'payPalEnvironmentSandbox';
  constructor(private payPal: PayPal, public navCtrl: NavController, public navParams: NavParams, private _userService: UserService, private _alertCtrl: AlertController) {
  }


  makePayment(){
    this._alertCtrl.create({
      title: 'Atenção!',
      buttons: [{ text: 'Cancelar' },{ text: 'OK', handler: () => {
        this.makePayment2()
      }}],
      subTitle: `Deseja comprar R$${this.payment.amount},00 de créditos?`
    }).present();
  }

  makePayment2() {
		let x = (parseFloat(this.payment.amount) / 3.266)
		this.payment.amount = String(x)
		console.log(x)
		this.payPal.init({
			PayPalEnvironmentProduction: '',
			PayPalEnvironmentSandbox: 'Abg4jwlPdVrJLFe13_sOUtuLVUH5RT78ns_OuJemwAR6PqPC8aSBBZ9crxbpJIgd_61515Vwwy5b6VG5'
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
          alert(`Successfully paid. Status = ${response.response.state}`);
          this._userService.updateCreditos(this.payment.amount, true);
        
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}
}
