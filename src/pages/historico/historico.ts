import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../domain/user/user-service';

/**
 * Generated class for the HistoricoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})


export class HistoricoPage {
  private _myOrders;
  private _total = 0;
  public headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Authorization': this._userService.getToken()
  
    });
  public options = new RequestOptions({ headers: this.headers });

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: Http, private _userService: UserService) {
  }

ionViewWillEnter(){
    this.loadOrders()
  }
  loadOrders(){
    this._http
    .get(`https://pi2-api.herokuapp.com/compra/?usuario=${this._userService.getIDLoggedUser()}`, this.options)
    .map(res => res.json())
    .toPromise()
    .then(_myOrders => {
      this._myOrders = _myOrders
      for(var i = 0; i<this._myOrders.length; i++){
        this._total += this._myOrders[i].preco;
      }      
    });
  }

}
