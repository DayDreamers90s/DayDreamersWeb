import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
// import {TabsPage} from '../tabs/tabs';
import { SideMenuPage } from '../side-menu/side-menu';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {

  role: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public storage: Storage, public loadingCtrl: LoadingController) {

  }

  register() {

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.createAccount(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      if (result != undefined) {
        this.storage.get(this.authService.USER_ID).then((val) => {
          var userDetails = {
            user: val,
            firstname: this.firstname,
            lastname: this.lastname,
            phonenumber: this.phonenumber,
          };
          this.authService.saveUserDetails(userDetails).then((res) => {
            // this.navCtrl.setRoot(TabsPage);
            this.navCtrl.setRoot(SideMenuPage);
          });
        });
      }     
    }, (err) => {
      this.loading.dismiss();
    });

  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
