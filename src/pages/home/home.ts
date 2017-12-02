import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../domain/user/user';
import { UserService } from '../../domain/user/user-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{
  public user = this._service.getLoggedUser();

  constructor(
    public navCtrl: NavController,
    private _service: UserService,
    private _http: Http){}

  loggedUser(){
    this.user = this._service.getLoggedUser();
    console.log(this.user)
  }

  doRefresh(refresher) {
    console.log('ANTES DO REFRESH: ', this.user)
    let email = this._service.getEmailLoggedUser()
    let userResponsed: User;
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': this._service.getToken()

      });
    let options = new RequestOptions({ headers: headers });

    this._http.get(`http://dev-pi2-api.herokuapp.com/users/?email=${email}`, options).subscribe(data => {
      console.log('SASASASASA', `http://dev-pi2-api.herokuapp.com/users/?email=${email}`)
      userResponsed = JSON.parse((data['_body']));
      this._service.saveLoggedUser(userResponsed[0])
      this.loggedUser()
    console.log('DEPOIS DO REFRESH: ', this.user)    
      refresher.complete();
    })
  }

}
