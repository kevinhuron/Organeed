import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding,
    List, ModalController, NavController,
    MenuController, LoadingController } from 'ionic-angular';
import { OrganeedService } from '../../providers/organeed';
import { ConferenceData } from '../../providers/conference-data';
// import { ScheduleFilterPage } from '../tags-list/tags-list';
import { EventDetailPage } from '../event-detail/event-detail';
import { UserData } from '../../providers/user-data';

@Component({
    templateUrl: 'schedule.html',
})

export class SchedulePage {
    @ViewChild('scheduleList', {read: List}) scheduleList: List;

    dayIndex = 0;
    queryText = '';
    segment = 'my';
    excludeTracks = [];
    nbEvents = 0;
    groups = [];
    events = [];
    days = [];
    nbComments = 0;

    constructor(
        public alertCtrl: AlertController,
        public app: App,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public confData: ConferenceData,
        public user: UserData,
        public menu: MenuController,
        public loadingController: LoadingController,
        private organeed: OrganeedService
    ) {
        this.menu.enable(true);
        this.menu.swipeEnable(true);
        // this.navCtrl.setRoot(SchedulePage);
    };

    ionViewDidEnter() {
        this.app.setTitle('Evènement');
    };

    ngAfterViewInit() {
        this.updateSchedule();
    };

    updateSchedule() {
        // initalize event
        this.organeed.getEventByManager(this.queryText).subscribe(res => {
            console.log('organeed get event by manager passed');
            this.nbEvents = res.json().events.length;
            this.events = res.json().events;
            let events = res.json().events;
            for (let event of events) {
                this.organeed.getComments(event.id_event).subscribe(res => {
                    this.nbComments = res.json().comments.length;
                });
            }
        });
    }


    goToSessionDetail(sessionData) {
        // go to event detail page
        this.navCtrl.push(EventDetailPage, sessionData);
    };

    addFavorite(slidingItem: ItemSliding, sessionData) {

        if (this.user.hasFavorite(sessionData.name)) {
            // woops, they already favorited it! What shall we do!?
            // prompt them to remove it
            this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
        } else {
            // remember this session as a user favorite
            this.user.addFavorite(sessionData.name);

            // create an alert instance
            let alert = this.alertCtrl.create({
                title: 'Favorite Added',
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        // close the sliding item
                        slidingItem.close();
                    }
                }]
            });
            // now present the alert on top of all other content
            alert.present();
        }

    };

    removeFavorite(slidingItem: ItemSliding, sessionData, title) {
        let alert = this.alertCtrl.create({
            title: title,
            message: 'Would you like to remove this session from your favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        // they clicked the cancel button, do not remove the session
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                },
                {
                    text: 'Remove',
                    handler: () => {
                        // they want to remove this session from their favorites
                        this.user.removeFavorite(sessionData.name);
                        this.updateSchedule();

                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                }
            ]
        });
        // now present the alert on top of all other content
        alert.present();
    };
    removeEvent(sessionData, title) {
        let alert = this.alertCtrl.create({
            title: title,
            message: 'Êtes-vous sûr de vouloir supprimer cet évènement ?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {
                        // they clicked the cancel button, do not remove the event
                        // close the sliding item and hide the option buttons
                        alert.dismiss();
                    }
                },
                {
                    text: 'Supprimer',
                    handler: () => {
                        // they want to remove this session from their favorites
                        // this.user.removeFavorite(sessionData.name);
                        // TODO : Remove Function
                        this.updateSchedule();

                        // close the sliding item and hide the option buttons
                        alert.dismiss();
                    }
                }
            ]
        });
        // now present the alert on top of all other content
        alert.present();
    };
    // ion refresher 'pull to refresh'
    refresh(refresher) {
        this.updateSchedule();
        refresher.complete();
    };
}
