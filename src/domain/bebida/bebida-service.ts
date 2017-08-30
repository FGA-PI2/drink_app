import { Injectable } from '@angular/core';
import { Bebida } from './bebida'
import {Http ,Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../user/user-service';

@Injectable()
export class BebidaService {

  private _bebidas: Bebida[];
  constructor(private _http: Http, private _userService: UserService){
    let headers = new Headers(
      {
        'Content-Type' : 'application/json',
        'Authorization': this._userService.getToken()

      });
      let options = new RequestOptions({ headers: headers });

      this._http.get(`https://pi2-api.herokuapp.com/drink/`, options).subscribe(data => {
        this._bebidas = JSON.parse((data['_body']));
        console.log('Drinks:', this._bebidas  );
      })
  }

  // SUBSTITUIR PELA API DEPOIS
  bebidas(){
    return this._bebidas;
  }
}
