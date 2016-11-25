import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {ViewChild } from '@angular/core';
import { Events, MenuController, Nav } from 'ionic-angular';
import { OrganeedService } from '../providers/organeed';
import { AccountPage } from '../pages/account/account';
import { ConferenceData } from '../providers/conference-data';
import { LoginPage } from '../pages/login/login';
/*import { SignupPage } from './pages/signup/signup';*/
import { TabsPage } from '../pages/tabs/tabs';
/*import { TutorialPage } from './pages/tutorial/tutorial';*/
import { UserData } from '../providers/user-data';
import { LoadingController } from 'ionic-angular';


interface PageObj {
    title: string;
    component: any;
    icon: string;
    index?: number;
}

@Component({
    templateUrl: 'app.html',
})

export class MyApp {
    //rootPage = LoginPage;


    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav:Nav;

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages:PageObj[] = [
        {title: 'Evènements', component: TabsPage, icon: 'albums'},
        {title: 'Calendrier', component: TabsPage, index: 1, icon: 'calendar'},
        {title: 'Créer un évènement', component: TabsPage, index: 2, icon: 'add-circle'},
        {title: 'Carte', component: TabsPage, index: 3, icon: 'map'},
        {title: 'A propos', component: TabsPage, index: 4, icon: 'information-circle'},

    ];
    loggedInPages:PageObj[] = [
        // { title: 'Account', component: AccountPage, icon: 'person' },
        {title: 'Déconnexion', component: TabsPage, icon: 'log-out'}
    ];
    /*loggedOutPages: PageObj[] = [
     { title: 'Login', component: LoginPage, icon: 'log-in' },
     { title: 'Signup', component: SignupPage, icon: 'person-add' }
     ];*/
    rootPage:any = LoginPage;

    constructor(platform: Platform,
                public events: Events,
                public userData: UserData,
                public menu: MenuController,
                confData: ConferenceData,
                private organeed: OrganeedService,
                public loadingController: LoadingController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            platform.ready().then(() => {
                StatusBar.styleDefault();
                Splashscreen.hide();
            });
            //StatusBar.styleDefault();
            //Splashscreen.hide();
            // load the conference data
            // confData.load();

            // decide which menu items should be hidden by current login status stored in local storage
            this.userData.hasLoggedIn().then((hasLoggedIn) => {
                this.enableMenu(hasLoggedIn === 'true');
            });

            this.listenToLoginEvents();
        });
    }

    accountPage() {
        this.nav.setRoot(AccountPage);
        this.menu.close();
    }

    openPage(page:PageObj) {
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});

        } else {
            this.nav.setRoot(page.component);
        }

        if (page.title === 'Logout') {
            // Give the menu time to close before changing to logged out
            this.enableMenu(false);
            this.organeed.logout().subscribe(
                data => {
                    // this.message = data.json().message;
                    // loader.dismiss();
                    this.userData.logout();
                    this.nav.setRoot(LoginPage).then(() => {
                        const index = this.nav.getActive().index;
                        this.nav.remove(0, index);
                    });
                },
                err => {
                    // loader.dismiss();
                    console.log(err.json().message);
                },
                () => console.log('logout is succesful')
            );

        }
    }

    listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
            this.enableMenu(true);
        });

        this.events.subscribe('user:signup', () => {
            this.enableMenu(true);
        });

        this.events.subscribe('user:logout', () => {
            this.enableMenu(false);
        });
    }

    enableMenu(loggedIn) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    }


}




