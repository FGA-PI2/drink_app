import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { UserService } from '../../domain/user/user-service';
import { User } from '../../domain/user/user';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: String = 'a@a.com';
  public senha: String = '1234';
  public user: User;
  public loader;


  constructor(
    public navCtrl: NavController,
    private _service: UserService,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController){


    }
    register(){
      this.navCtrl.push(RegisterPage)
    }

    tryLogin(){
      this.loader = this._loadingCtrl.create({
        content: 'Logando...'
      })
      this.loader.present()

      //SIMULATE API DELAY
      setTimeout(()=>{
        this.user = this._service.getUser();
        if(this.user.email != this.email || this.user.senha != this.senha){
          this.loader.dismiss()
          this._alertCtrl.create({
            title: 'OPS!',
            buttons: [{text: 'OK'}],
            subTitle: 'Email ou senha incorretos!'
          }).present();
        } else {
          this._service.saveLoggedUser(this.user);
          this.navCtrl.setRoot(MenuPage)
          this.loader.dismiss()
        }
      }, 800);
    }
  }
