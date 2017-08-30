import { Injectable } from '@angular/core';
import { Bebida } from '../bebida/bebida';
import {Http ,Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../user/user-service';

@Injectable()
export class CardapioService {

  private _cardapio: Bebida[];
  constructor(private _http: Http, private _userService: UserService){
    
  }

  // SUBSTITUIR PELA API DEPOIS
  getCardapio(){
    return this._cardapio;
  }
}
