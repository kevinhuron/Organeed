import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
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
class ConferenceApp {

    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav:Nav;

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages:PageObj[] = [
        {title: 'Evènement', component: TabsPage, icon: 'calendar'},
        {title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts'},
        {title: 'Créer un évènement', component: TabsPage, index: 2, icon: 'add-circle'},
        {title: 'Carte', component: TabsPage, index: 3, icon: 'map'},
        {title: 'About', component: TabsPage, index: 4, icon: 'information-circle'},

    ];
    loggedInPages:PageObj[] = [
        // { title: 'Account', component: AccountPage, icon: 'person' },
        {title: 'Logout', component: TabsPage, icon: 'log-out'}
    ];
    rootPage:any = LoginPage;

    constructor(public events: Events,
                public userData: UserData,
                public menu: MenuController,
                platform: Platform,
                confData: ConferenceData,
                private organeed: OrganeedService,
                public loadingController: LoadingController) {
        // Call any initial plugins when ready
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });

        // load the conference data
        // confData.load();

        // decide which menu items should be hidden by current login status stored in local storage
        this.userData.hasLoggedIn().then((hasLoggedIn) => {
            this.enableMenu(hasLoggedIn === 'true');
        });

        this.listenToLoginEvents();
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


// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

