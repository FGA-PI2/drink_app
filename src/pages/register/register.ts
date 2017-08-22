import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'register.html'
})

export class RegisterPage {

  // public nome: string;
  name: string = '';
  public email: string;
  public nascimento: string;
  public senha: string;
  public senha2: string;

  constructor(public navCtrl: NavController){

  }

  registerAccount(){
    console.log(this.name);
    console.log(this.email);
    console.log(this.nascimento);
    console.log(this.senha);
    console.log(this.senha2);
  }
}
