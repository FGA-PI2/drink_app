import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {Http ,Response, Headers, RequestOptions } from '@angular/http';
import { RegisterPage } from '../register/register'
import { UserService } from '../../domain/user/user-service';
import { User } from '../../domain/user/user';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../../pages/menu/menu';
import { AdminPage } from '../../pages/admin/admin';



@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})

@Injectable()
export class LoginPage {

  public email: String = 'user2@email.com';
  public password: String = '1234';
  public user: User;
  public loader;
  private _token;


  constructor(
    private _http: Http,
    public navCtrl: NavController,
    private _service: UserService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private splashScreen: SplashScreen){

      this.splashScreen.show();

      this.splashScreen.hide();
      console.log(new Date().toISOString())

    }
    register(){
      this.navCtrl.push(RegisterPage)
    }

    tryLogin(){
      this.loader = this._loadingCtrl.create({
        content: 'Logando...'
      })
      this.loader.present()

      console.log('tentano buscar token de:', this.email, this.password);
      const newUser = {
        password: this.password,
        username: this.email,
      };
      let headers = new Headers(
        {
          'Content-Type' : 'application/json',

        });
        let options = new RequestOptions({ headers: headers });

        this._http.post('https://pi2-api.herokuapp.com/api-token-auth/', (newUser), options).subscribe(data => {
          this._token = (JSON.parse(data['_body'])['token']);
          console.log('token gerada:', this._token);
          this._service.saveToken(this._token);
          this.requestUserWithToken(this.email);
        }, err => {
          this.loader.dismiss()
          this._alertCtrl.create({
            title: 'OPS!',
            buttons: [{text: 'OK'}],
            subTitle: 'Não foi possível conectar ao servidor!'
          }).present();
        });
      }


      requestUserWithToken(emailRequest){
        console.log('buscando dados do usuario:', emailRequest);
        let userResponsed: User;
        let headers = new Headers(
          {
            'Content-Type' : 'application/json',
            'Authorization': this._token

          });
          let options = new RequestOptions({ headers: headers });

          this._http.get(`https://pi2-api.herokuapp.com/users/?email=${emailRequest}`, options).subscribe(data => {
            userResponsed = JSON.parse((data['_body']));
            console.log('Usuario retornado:', userResponsed[0]);
            if(userResponsed[0].email != emailRequest){
              this.loader.dismiss()
              this._alertCtrl.create({
                title: 'OPS!',
                buttons: [{text: 'OK'}],
                subTitle: 'Email ou senha incorretos!'
              }).present();
            } else {
              console.log('sucesso!', userResponsed[0].email);
              this._service.saveLoggedUser(userResponsed[0]);
              if(userResponsed[0].is_superuser == true){
                this.loader.dismiss()
                this.navCtrl.setRoot(AdminPage)
                console.log('É ADM');
              } else {
                this.loader.dismiss()
                console.log('NAO É ADM');
                this.navCtrl.setRoot(MenuPage);
              }
            }})
          }
        }
