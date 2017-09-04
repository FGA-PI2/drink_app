import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { User } from '../../domain/user/user';
import { UserService } from '../../domain/user/user-service';
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
  public loader;

  constructor(
      public navCtrl: NavController,
      private _http: Http,
      private _service: UserService,
      private _loadingCtrl: LoadingController,
      private _alertCtrl: AlertController){
    this.user = new User();
  }

  registerAccount(){
    this.loader = this._loadingCtrl.create({
      content: 'Criando sua conta, por favor aguarde...'
    })
    this.loader.present()
    const newUser: User = {
      first_name: this.user.first_name,
      password: this.user.password,
      is_superuser: false,
      data_nascimento: this.user.data_nascimento,
      email: this.user.email,
      creditos: 0
    };
    console.log(newUser);
    let headers = new Headers(
      {
        'Content-Type' : 'application/json',

      });
      let options = new RequestOptions({ headers: headers });

    this._http.post('https://pi2-api.herokuapp.com/users/', (newUser), options).subscribe(data => {
      this.loader.dismiss()
      this._alertCtrl.create({
        title: 'Uhuu!',
        buttons: [{text: 'OK', handler: () =>{
          this._service.saveLoggedUser(newUser);
          this.navCtrl.push(MenuPage)
        }}],
        subTitle: 'Sua conta foi criada com sucesso!'
      }).present();

      console.log(data);
    });
  }
}
