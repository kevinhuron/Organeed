import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
//import { Storage } from 'ionic-storage';
import { NativeStorage } from 'ionic-native';


@Injectable()
export class UserData {
    _favorites = [];
    HAS_LOGGED_IN = 'hasLoggedIn';
    storage = NativeStorage;

    constructor(public events:Events) {
    }

    hasFavorite(sessionName) {
        return (this._favorites.indexOf(sessionName) > -1);
    }

    addFavorite(sessionName) {
        this._favorites.push(sessionName);
    }

    removeFavorite(sessionName) {
        let index = this._favorites.indexOf(sessionName);
        if (index > -1) {
            this._favorites.splice(index, 1);
        }
    }

    login(username, user) {
        NativeStorage.setItem(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.setUserId(user.userid);
        this.events.publish('user:login');
    }

    signup(username) {
        NativeStorage.setItem(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:signup');
    }

    logout() {
        NativeStorage.remove(this.HAS_LOGGED_IN);
        NativeStorage.remove('username');
        this.events.publish('user:logout');
    }

    setUsername(username) {
        NativeStorage.setItem('username', username);
    }

    setUserId(userId) {
        NativeStorage.setItem('userId', userId);
    }

    getUsername() {
        return NativeStorage.getItem('username').then((value) => {
            return value;
        });
    }

    getUserId() {
        return NativeStorage.getItem('userId').then((value) => {
            return value;
        });
    }

    // return a promise
    hasLoggedIn() {
        return NativeStorage.getItem(this.HAS_LOGGED_IN).then((value) => {
            return value;
        });
    }
}
