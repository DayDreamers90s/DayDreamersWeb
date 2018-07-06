import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ImagepickerPage} from '../imagepicker/imagepicker'
/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  picToView: string  = "assets/imgs/rolsroyse.png";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  showbase(){
    this.picToView = "assets/imgs/rolsroyce_base.jpg";
  }

  removebase(){
    this.picToView= "assets/imgs/rolsroyse.png";
  }
  uploadImage(){
    this.navCtrl.push(ImagepickerPage);
  }
}

