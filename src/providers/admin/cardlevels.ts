import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Auth } from '../auth/auth';

@Injectable()
export class CardLevelsProvider {

    constructor(public http: Http, public events: Events, public auth: Auth, public storage: Storage) {

    }

    addCardLevel(level) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.auth.localhost_url + 'api/cardlevels', JSON.stringify(level), options)
                .subscribe(res => {
                    let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    getCardLevels() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.auth.localhost_url + 'api/cardlevels', options)
                .subscribe(res => {
                    let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    getCardLevel(levelid) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.get(this.auth.localhost_url + 'api/cardlevels/' + levelid, options)
                .subscribe(res => {
                    let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    deleteCardLevel(levelid) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.delete(this.auth.localhost_url + 'api/cardlevels/' + levelid)
                .subscribe(res => {
                    let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateCardLevel(level) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.put(this.auth.localhost_url + 'api/cardlevels/' + level._id, JSON.stringify(level), options)
                .subscribe(res => {
                    let data = res.json();
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

}


