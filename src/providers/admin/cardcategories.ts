import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Auth } from '../auth/auth';

@Injectable()
export class CardCategoriesProvider {

  constructor(public http: Http, public events: Events, public auth: Auth, public storage: Storage) {

  }

  addCategory(category) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.auth.localhost_url + 'api/cardcategories', JSON.stringify(category), options)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
          this.http.get(this.auth.localhost_url + 'api/cardcategories',options)
            .subscribe(res => {
              let data = res.json();
              resolve(data);
            }, (err) => {
              reject(err);
            });
    });
  }

  getCategory(categoryid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
          this.http.get(this.auth.localhost_url + 'api/cardcategories/'+ categoryid,options)
            .subscribe(res => {
              let data = res.json();
              resolve(data);
            }, (err) => {
              reject(err);
            });
    });
  }

  deleteCategory(categoryid) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.delete(this.auth.localhost_url + 'api/cardcategories/' + categoryid)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateCategory(category) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
          this.http.put(this.auth.localhost_url + 'api/cardcategories/'+ category._id, JSON.stringify(category) ,options)
            .subscribe(res => {
              let data = res.json();
              resolve(data);
            }, (err) => {
              reject(err);
            });
    });
  }

}


