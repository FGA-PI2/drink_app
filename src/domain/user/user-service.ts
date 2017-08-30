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
    if(plus == true){
      this._userLogado.creditos += creditos;
    }else{
      this._userLogado.creditos -= creditos;
    }
  }
}
