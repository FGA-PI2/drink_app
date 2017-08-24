import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-querycode',
  templateUrl: 'querycode.html',
})
export class QuerycodePage {

  public querycodeString;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {
    this.querycodeString = this.navParams.get('string');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
