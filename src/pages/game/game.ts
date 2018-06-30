import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DrawcanvasComponent} from '../../components/drawcanvas/drawcanvas';
import {UserBuddiesPage} from '../user-buddies/user-buddies';
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  enterSinglePlayerMode(event: Event){
      this.navCtrl.push(DrawcanvasComponent);
  }

  enterMultiPlayerMode(event: Event){
    this.navCtrl.push(UserBuddiesPage);
  }

}
