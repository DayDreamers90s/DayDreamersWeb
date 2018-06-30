import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Auth } from '../auth/auth';

@Injectable()
export class UserBuddiesProvider {

  constructor(public http: Http, public events: Events, public auth: Auth, public storage: Storage) {

  }

  addUserBuddy(buddy) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.auth.localhost_url + 'api/userbuddies', JSON.stringify(buddy), options)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUserBuddies() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.storage.get(this.auth.USER_ID).then((val) => {
        if (val != '' && val != undefined) {
          this.http.get(this.auth.localhost_url + 'api/userbuddies/foruser/' + val)
            .subscribe(res => {
              let data = res.json();
              resolve(data);
            }, (err) => {
              reject(err);
            });
        } else {
          reject("Invalid user");
        }
      });
    });
  }

  deleteUserBuddy(buddyid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.delete(this.auth.localhost_url + 'api/userbuddies/' + buddyid)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

}


