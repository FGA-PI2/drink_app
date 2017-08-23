import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    private _service: UserService
  ){
  }
  register(){
    this.navCtrl.push(RegisterPage)
  }

  tryLogin(){
    this.user = this._service.getUser();
    if(this.user.email != this.email || this.user.senha != this.senha){
      console.log('LOGIN OU SENHA INVÁLIDOS!');
    } else {
      console.log('LOGIN REALIZADO COM SUCESSO!');
      this._service.saveLoggedUser(this.user);
      this.navCtrl.setRoot(MenuPage)
    }
  }
}
