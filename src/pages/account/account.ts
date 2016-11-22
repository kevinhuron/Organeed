import { Component } from '@angular/core';
import { OrganeedService } from '../../providers/organeed';
import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';


@Component({
    templateUrl: 'account.html',
})
export class AccountPage {
    firstname: string;
    lastname: string;
    email: string;
    username: string;

    constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData, private organeed: OrganeedService) {

    }

    ngAfterViewInit() {
        this.getUser();
    }

    getUser() {
        this.organeed.getUserById().subscribe(res => {
            console.log('organeed get user passed');
            console.log(res.json());
            this.email = res.json().userInfo[0].email;
            this.firstname = res.json().userInfo[0].first_name;
            this.lastname = res.json().userInfo[0].last_name;
        }, err => {
            console.log(err);
        });
    }

    updatePicture() {
        console.log('Clicked to update picture');
    }

    // Present an alert with the current username populated
    // clicking OK will update the username and display it
    // clicking Cancel will close the alert and do nothing
    changeUsername() {
        let alert = this.alertCtrl.create({
            title: 'Change Username',
            buttons: [
                'Cancel'
            ]
        });
        alert.addInput({
            name: 'username',
            value: this.username,
            placeholder: 'username'
        });
        alert.addButton({
            text: 'Ok',
            handler: data => {
                this.userData.setUsername(data.username);
                this.getUsername();
            }
        });

        alert.present();
    }

    changefirstname() {
        let alert = this.alertCtrl.create({
            title: 'Modifier votre prénom',
            buttons: [
                'Annuler'
            ]
        });
        alert.addInput({
            name: 'firstname',
            value: this.firstname,
            placeholder: 'Votre prénom'
        });
        alert.addButton({
            text: 'Valider',
            handler: data => {
                this.organeed.updateUserById(data.firstname, null, null, null, null).subscribe(res => {
                    console.log('update');
                    this.getUser();
                }, err => {
                    console.log(err);
                });
            }
        });
        alert.present();
    }

    changelastname() {
        let alert = this.alertCtrl.create({
            title: 'Modifier votre nom',
            buttons: [
                'Annuler'
            ]
        });
        alert.addInput({
            name: 'lastname',
            value: this.lastname,
            placeholder: 'Votre nom'
        });
        alert.addButton({
            text: 'Valider',
            handler: data => {
                this.organeed.updateUserById(null, data.lastname, null, null, null).subscribe(res => {
                    console.log('update');
                    this.getUser();
                }, err => {
                    console.log(err);
                });
            }
        });
        alert.present();
    }

    changeEmail() {
        let alert = this.alertCtrl.create({
            title: 'Modifier votre email',
            buttons: [
                'Annuler'
            ]
        });
        alert.addInput({
            name: 'email',
            value: this.email,
            placeholder: 'Votre email'
        });
        alert.addButton({
            text: 'Valider',
            handler: data => {
                this.organeed.updateUserById(null, null, null, data.email, null).subscribe(res => {
                    console.log('update');
                    this.getUser();
                }, err => {
                    console.log(err);
                    let alertMailError = this.alertCtrl.create({
                        title: 'Erreur - Email existant',
                        subTitle: 'Cette email existe déjà, Veuillez en choisir un autre.',
                        buttons: [
                            'OK'
                        ]
                    });
                    alertMailError.present();
                });
            }
        });
        alert.present();
    }

    getUsername() {
        this.userData.getUsername().then((username) => {
            this.username = username;
        });
    }

    changePassword() {
        console.log('Clicked to change password');
    }

    logout() {
        this.userData.logout();
        this.nav.setRoot(LoginPage);
    }
}
