import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';
import { QuerycodePage } from '../../pages/querycode/querycode';
import { CardapioPage } from '../../pages/cardapio/cardapio';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
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
      'Content-Type': 'application/json',
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
    public modalCtrl: ModalController,
  ) {
    this.drink = this.navParams.get('drink').drink;
    this.image = this.navParams.get('drink').image;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  buyDrink(item) {
    this.loader = this._loadingCtrl.create({
      content: 'Processando pagamento...'
    })
    this._alertCtrl.create({
      title: 'ATENÇÃO!',
      subTitle: `Deseja comprar ${item.nome} por R$${item.preco},00?`,
      buttons: [{ text: 'Cancelar' }, {
        text: 'Comprar', handler: () => {
          this.loader.present()
          setTimeout(() => {
            this.loader.dismiss()
            this.processDrink(item);
          }, 1000);
        }
      }]
    }).present()
    console.log(item)
  }

  processDrink(item) {
    this.loader.dismiss()
    if (this._user[0].creditos < item.preco) {
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
        buttons: [{
          text: 'OK', handler: () => {
            this.callQueryCode(item)
          }
        }]
      });
      alert.present(item);
    }
  }

  callQueryCode(item) {
    let json = `{"usuario":"${this._user[0].id}","data_compra":"${item.data_compra}"}`
    this.data = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=' + json

    item.usuario = this._user[0].id,
    item.qr_code = {
      is_valid: true,
      qr_code: this.data
    }
    let  myOrder = {
      pedido: item.pedido,
      qr_code: {
          is_valid: true,
          qr_code: this.data,
          usuario: this._user[0].id
      },
      nome: item.nome,
      gelo: this.ice,
      data_compra: item.data_compra,
      usuario: this._user[0].id
  }
    console.log('AQUIIIII ',myOrder);
    this._http
      .post(`http://dev-pi2-api.herokuapp.com/compra/`, myOrder, this.options).subscribe(data => {
        console.log(data);
        let modal = this.modalCtrl.create(QuerycodePage, { 'string': this.data });
        modal.present();
      });
  }

  checkoutCustomDrink(drink) {
    console.log('ESSE É O DRINK:', drink)
    this.loader = this._loadingCtrl.create({
      content: 'Processando pagamento...'
    })
    this.loader.present()
    var proporcaoDrink = [];
    for (var i = 0; i < drink.proporcao.length; i++) {
      let x = { bebida: drink.proporcao[i].bebida, volume: drink.proporcao[i].volume }
      proporcaoDrink.push(x)
    }
    this._http
      .get(`http://dev-pi2-api.herokuapp.com/users/?email=${this._userService.getEmailLoggedUser()}`, this.options)
      .map(res => res.json())
      .toPromise()
      .then(_user => {
        this._user = _user
        console.log('RETORNEI ISSO: ', this._user);
        let myDate: String = new Date().toISOString();
        let drinkJson = {
          pedido: proporcaoDrink,
          gelo: this.ice,
          tamanho: drink.size,
          data_compra: myDate,
          preco: drink.preco,
          nome: drink.nome,
        }
        this.processDrink(drinkJson);
      });
  }

}
