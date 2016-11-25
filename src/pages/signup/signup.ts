import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { OrganeedService } from '../../providers/organeed';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import {LoginPage} from '../login/login';
// import { SchedulePage } from '../schedule/schedule';

@Component({
    templateUrl: 'signup.html'
})
export class SignupPage {
    signup:{firtname?: string, lastname?: string, age?: number, phone?: string, email?: string, password?: string} = {};
    submitted = false;

    constructor(private organeed: OrganeedService,
                public navCtrl: NavController, public userData: UserData,
                public loadingController: LoadingController, public alertCtrl: AlertController) {
    }

    // sing up form
    onSignup(form) {
        this.submitted = true;
        // check if form is valid
        if (form.valid) {
            let loader = this.loadingController.create({
                content: ''
            });
            let alert = this.alertCtrl.create({
                title: 'Erreur !',
                subTitle: 'L\'email existe probablement déjà. Veuillez en saisir une autre.',
                buttons: ['OK']
            });
            loader.present();
            // call provider to validate user, insert data and log him
            this.organeed.register(this.signup.firtname, this.signup.lastname, this.signup.age, this.signup.phone, this.signup.email,
                this.signup.password).subscribe(
                data => {
                    // this.message = data.json().message;
                    loader.dismiss();
                    this.userData.login(this.signup.email, data.json());
                    this.navCtrl.setRoot(TabsPage).then(() => {
                        const index = this.navCtrl.getActive().index;
                        this.navCtrl.remove(0, index);
                    });
                },
                err => {
                    alert.present();
                    loader.dismiss();
                    console.log(err.json().message);
                },
                () => console.log('register is succesfull')
            );
            // this.userData.signup(this.signup.email);
            // this.navCtrl.push(TabsPage);
        }
    }

    navigateBack() {
        this.navCtrl.setRoot(LoginPage);
    }
}
