import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrawcanvasComponent } from '../../components/drawcanvas/drawcanvas';
import { Auth } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { UserBuddiesProvider } from '../../providers/user-buddies/user-buddies';
/**
 * Generated class for the UserBuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-buddies',
  templateUrl: 'user-buddies.html',
})
export class UserBuddiesPage {

  username: string;
  email: string;
  userbuddies: UserBuddiesModel[];
  selectedbuddies: UserBuddiesModel[];

  constructor(public navCtrl: NavController, public auth: Auth, public userBuddies: UserBuddiesProvider, public storage: Storage, public navParams: NavParams) {
    this.userbuddies = [];
    this.selectedbuddies = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserBuddiesPage');
    this.userBuddies.getUserBuddies().then((result) => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          this.userbuddies.push(new UserBuddiesModel(result[key]));
        }
      }
      console.log("User buddies: " + JSON.stringify(result));
    }, (err) => {
      console.log(err);
    });
  }

  AddPlayer(e) {
    let buddy = {
      name: this.username,
      email: this.email
    }
    if (this.auth.checkAuthentication()) {
      this.storage.get(this.auth.USER_ID).then((val) => {
        buddy["user"] = val;
        this.userBuddies.addUserBuddy(buddy).then((res) => {
          this.userbuddies.push(new UserBuddiesModel(res));
          this.email = "";
          this.username = "";
        });
      });
    }
    else {
      //throw error not authenticated
    }
  }

  TogglePlayerSelect(event, buddy) {
    var index = this.selectedbuddies.map(function (item) { return item._id; }).indexOf(buddy._id);
    if (index == -1) { //add the player to selected list
      this.selectedbuddies.push(buddy);
      if (event.target.localName === 'ion-icon') {
        event.target.className = event.target.className.replace('icon-md-primary', 'icon-md-danger');
        event.target.className = event.target.className.replace('icon-ios-primary', 'icon-ios-danger');
      } else if (event.target.parentElement.localName === 'ion-icon') {
        event.target.parentElement.className = event.target.parentElement.className.replace('icon-md-primary', 'icon-md-danger');
        event.target.parentElement.className = event.target.parentElement.className.replace('icon-ios-primary', 'icon-ios-danger');
      }
    } else { // remove the player from selected list
      this.selectedbuddies.splice(index, 1);
      if (event.target.localName === 'ion-icon') {
        event.target.className = event.target.className.replace('icon-md-danger', 'icon-md-primary');
        event.target.className = event.target.className.replace('icon-ios-danger', 'icon-ios-primary');
      } else if (event.target.parentElement.localName === 'ion-icon') {
        event.target.parentElement.className = event.target.parentElement.className.replace('icon-md-danger', 'icon-md-primary');
        event.target.parentElement.className = event.target.parentElement.className.replace('icon-ios-danger', 'icon-ios-primary');
      }

    }
    console.log("Selected buddies: " + JSON.stringify(this.selectedbuddies));
  }



  DeletePlayer(buddy) {
    this.userBuddies.deleteUserBuddy(buddy._id).then((res) => {
      var removed = new UserBuddiesModel(res);
      var removeIndex = this.userbuddies.map(function (item) { return item._id; }).indexOf(removed._id);
      if (removeIndex !== -1) {
        this.userbuddies.splice(removeIndex, 1);
      }
      var removeSelectedIndex = this.selectedbuddies.map(function (item) { return item._id; }).indexOf(removed._id);
      if (removeSelectedIndex !== -1) {
        this.selectedbuddies.splice(removeIndex, 1);
      }
    });

  }

  StartMultiPlayerGame(e) {
    console.log("Starting game with: " + this.selectedbuddies);
    this.navCtrl.push(DrawcanvasComponent,  { 'Players': this.selectedbuddies });
  }

}

export class UserBuddiesModel {
  _id: string;
  user: string;
  name: string;
  email: string;

  constructor(response: any) {
    this._id = response._id;
    this.user = response.user;
    this.name = response.name;
    this.email = response.email;
  }
}
