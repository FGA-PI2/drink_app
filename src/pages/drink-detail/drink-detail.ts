import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';
import { QuerycodePage } from '../../pages/querycode/querycode';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@IonicPage()
@Component({
  selector: 'page-drink-detail',
  templateUrl: 'drink-detail.html',
})
export class DrinkDetailPage {


  public drink;
  public loader;
  public size;
  public ice;
  public data: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _userService: UserService,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _http: Http,
    public modalCtrl: ModalController) {
    this.drink = this.navParams.get('drink');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buyDrink(item){
    this.loader = this._loadingCtrl.create({
      content: 'Processando pagamento...'
    })
    this._alertCtrl.create({
      title: 'ATENÇÃO!',
      subTitle: `Deseja comprar ${item.nome} por ${item.preco}?`,
      buttons: [{text: 'Cancelar'},{text: 'Comprar', handler: () => {
        this.loader.present()
        setTimeout(()=>{
            this.loader.dismiss()
            this.processDrink(item);
        }, 1000);
      }}]
    }).present()
    console.log(item)
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
      buttons: [{text: 'OK', handler: () => {
        this.callQueryCode(item)
      }}]
    });
    alert.present(item);
  }
  }

  callQueryCode(item){
    let myDate: String = new Date().toISOString();
    let user = this._userService.getLoggedUser()
    let json = `{email: ${user.email},drink: ${item.nome},gelo: ${this.ice},tamanho: ${this.size},data: ${myDate}}`
    this.data = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl='+json
    let modal = this.modalCtrl.create(QuerycodePage, {'string': this.data});
    modal.present();
  }

}
