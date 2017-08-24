import { Injectable } from '@angular/core';
import { User } from './user'

@Injectable()
export class UserService {

  private _user: User;
  private _userLogado: User;
  constructor(){
    this._user = new User();
    console.log('CRIEI O SERVICE!');
  }

  // SUBSTITUIR PELA API DEPOIS
  getUser(){
    this._user.nome = 'Pedro';
    this._user.email = 'a@a.com';
    this._user.senha = '1234';
    this._user.creditos = 25;
    return this._user;

  }

  getLoggedUser(){
    console.log('buscando logado:', this._userLogado);
    return this._userLogado;
  }

  saveLoggedUser(user){
    console.log('salvando user logado', user);
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
