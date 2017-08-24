import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { User } from '../../domain/user/user';
import {Http ,Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'register.html'
})

export class RegisterPage {

  public user: User;

  constructor(public navCtrl: NavController, private _http: Http,){
    this.user = new User();
  }

  registerAccount(){
    let headers = new Headers(
      {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      });
      let options = new RequestOptions({ headers: headers });

      let data = JSON.stringify({
        password: "dewewd",
        username: "ISSO EH UM TESTE",
        first_name: "Peddwedewro",
        last_name: "Antonio",
        email: "pdwede@a.com",
        date_joined: "2017-08-24T12:33:55.647825Z"});

        return new Promise((resolve, reject) => {
          this._http.post('https://pi2-api.herokuapp.com/users', data, options)
          .toPromise()
          .then((response) =>
          {
            console.log('API Response : ', response.json());
            resolve(response.json());
          })
          .catch((error) =>
          {
            console.error('API Error : ', error.status);
            console.error('API Error : ', JSON.stringify(error));
            reject(error.json());
          });
        });
      }
      // console.log(this.user.nome);
      // console.log(this.user.email);
      // console.log(this.user.nascimento);
      // console.log(this.user.senha);
      // console.log(this.user.senha2);
      // this.navCtrl.push(MenuPage)
    }
