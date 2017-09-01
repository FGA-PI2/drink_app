import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';
import { QuerycodePage } from '../../pages/querycode/querycode';
import {Http ,Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@IonicPage()
@Component({
  selector: 'page-drink-detail',
  templateUrl: 'drink-detail.html',
})
export class DrinkDetailPage {

  private _user;
  public drink;
  public image;
  public loader;
  public size = null;
  public ice = false;
  public data: string;
  public headers = new Headers(
    {
      'Content-Type' : 'application/json',
      'Authorization': this._userService.getToken()

    });
    public options = new RequestOptions({ headers: this.headers });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _userService: UserService,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _http: Http,
    public modalCtrl: ModalController) {
    this.drink = this.navParams.get('drink').drink;
    this.image = this.navParams.get('drink').image;
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
    this.loader.dismiss()
    if(this._user.creditos < item.preco){
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
    let json = `{"user":"${this._user[0].email}","bebidas":"${item.bebidas}","gelo":"${this.ice}","tamanho":"${item.tamanho}","data":"${item.data}"}`
    this.data = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl='+json
    console.log(json);
    let modal = this.modalCtrl.create(QuerycodePage, {'string': this.data});
    modal.present();
  }

  checkoutCustomDrink(drink){
      this.loader = this._loadingCtrl.create({
        content: 'Processando pagamento...'
      })
      this.loader.present()
      this._http
      .get(`https://pi2-api.herokuapp.com/users/?email=${this._userService.getEmailLoggedUser()}`, this.options)
      .map(res => res.json())
      .toPromise()
      .then(_user =>{
        this._user = _user
        console.log('RETORNEI ISSO: ', this._user);
        let myDate: String = new Date().toISOString();
        let drinkJson = {
          bebidas: drink.nome,
          gelo: this.ice,
          tamanho: drink.size,
          data: myDate,
          preco: drink.preco
        }
        this.processDrink(drinkJson);
      });
  }

}
