import { Component } from '@angular/core';
import { NavController, MenuController, AlertController} from 'ionic-angular';
import { OrganeedService } from '../../providers/organeed';
import { SignupPage } from '../signup/signup';
import { UserData } from '../../providers/user-data';
import { SchedulePage } from '../schedule/schedule';
/*import { Toast } from 'ionic-native';*/
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

declare var window:any;

@Component({
    templateUrl: 'login.html',
    selector: 'login-page'
})
export class LoginPage {

    login:{username?: string, password?: string} = {};
    submitted = false;

    constructor(private organeed: OrganeedService, public navCtrl: NavController,
                public userData: UserData, public  menuCtl: MenuController,
                public loadingController: LoadingController, public alertCtrl: AlertController) {
        if (this.userData.hasLoggedIn()) {
            this.menuCtl.swipeEnable(false);
            this.menuCtl.enable(false);
        }
        else
            this.navCtrl.push(SchedulePage);

    }

    onLogin(form) {
        this.submitted = true;
        // check if form is valid
        if (form.valid) {
            let loader = this.loadingController.create({
                content: ''
            });
            let alert = this.alertCtrl.create({
                title: 'Oupss !',
                subTitle: 'Identifiant ou de mot de passe incorrect !',
                buttons: ['OK']
            });
            loader.present();
            // connect user
            this.organeed.connection(this.login.username, this.login.password).subscribe(
                data => {
                    loader.dismiss();
                    this.userData.login(this.login.username, data.json());
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
                () => console.log('Connection is succesful')
            );
        }
    }

    onSignup() {
        this.navCtrl.push(SignupPage);
    }

}
