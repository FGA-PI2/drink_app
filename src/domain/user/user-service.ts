import { Injectable } from '@angular/core';
import { User } from './user'
import {Http ,Response, Headers, RequestOptions } from '@angular/http';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private _user: User;
  private _token;
  public _userLogado;
  public loader;
  private _navCtrl: NavController;
  private _login: LoginPage;
  public headers = new Headers(
    {
      'Content-Type' : 'application/json',
      'authorization' : this._token

    });
    public options = new RequestOptions({ headers: this.headers })


  constructor(
    private _http: Http,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController){


      this._user = new User();
      this._userLogado = new User();
  }


  getLoggedUser(){
    return this._userLogado;
  }

  getEmailLoggedUser(){
    return this._userLogado.email;
  }

  getToken(){
    console.log('buscando token:', this._token);
    return this._token;
  }

  saveToken(token){
    console.log('buscando token:', this._token);
    this._token = token;
  }

  saveLoggedUser(user){
    this._userLogado = user;
  }

  updateCreditos(creditos, plus){
    let url = `https://pi2-api.herokuapp.com/users/${this._userLogado.id}/`
    if(plus == true){
      const cred = {
        creditos: this._userLogado.creditos + creditos
      }
      console.log(JSON.stringify(cred));
      console.log('A URL É: ', url)
      this._http.patch(url, cred, this.options).subscribe(data => {
        console.log(data);
        this._userLogado.creditos = cred.creditos;
      });
    }else{
      const cred = {
        creditos: this._userLogado.creditos - creditos
      }
      console.log(JSON.stringify(cred));
      console.log('A URL É: ', url)
      this._http.patch(url, cred, this.options).subscribe(data => {
        console.log(data);
        this._userLogado.creditos = cred.creditos;
      });

      
    }
  }
}
