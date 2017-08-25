import { Injectable } from '@angular/core';
import { User } from './user'
import {Http ,Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private _user: User;
  private _userLogado: User;
  constructor(private _http: Http){
    this._user = new User();
    console.log('CRIEI O SERVICE!');
  }

  // SUBSTITUIR PELA API DEPOIS
  getUser(emailRequest, passwordRequest){
    // let userResponse = this._http.get(`https://pi2-api.herokuapp.com/users/?email=${emailRequest}&password=${passwordRequest}`).subscribe(data => {
      // Read the result field from the JSON response.
    //   console.log(data['_body']);
    // });
    this._user.email = 'a@a.com';
    this._user.password = '1234';
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
