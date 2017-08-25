import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../domain/user/user';
import { UserService } from '../../domain/user/user-service';

@Component({
  templateUrl: 'home.html'
})

export class HomePage{


  constructor(
    public navCtrl: NavController,
    private _service: UserService){}

  get loggedUser(){
    return this._service.getLoggedUser();
  }

}
