import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu'
import { User } from '../../domain/user/user'

@Component({
  templateUrl: 'register.html'
})

export class RegisterPage {

  public user: User;

  constructor(public navCtrl: NavController){
    this.user = new User();
  }

  registerAccount(){
    console.log(this.user.nome);
    console.log(this.user.email);
    console.log(this.user.nascimento);
    console.log(this.user.senha);
    console.log(this.user.senha2);
    this.navCtrl.push(MenuPage)
  }
}
