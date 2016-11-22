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
    // the list is a child of the schedule page
    // @ViewChild('scheduleList') gets a reference to the list
    // with the variable #scheduleList, `read: List` tells it to return
    // the List and not a reference to the element
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
        // Close any open sliding items when the schedule updates
        // this.scheduleList && this.scheduleList.closeSlidingItems();
        this.organeed.getEventByManager(this.queryText).subscribe(res => {
            console.log('organeed get event by manager passed');
            this.nbEvents = res.json().events.length;
            this.events = res.json().events;
            let events = res.json().events;
            for (let event of events) {
                this.organeed.getComments(event.id_event).subscribe(res => {
                    // console.log(res.json().comments.length);
                    this.nbComments = res.json().comments.length;
                });
            }
        });
        /*this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
            console.log(data.length);
            this.nbEvents = data.length;
            // this.groups = data;
            /*let days = [];
            let allevent = [];
            for (let event of data) {
                days.push(event.date_start);
            }
            let i = 0;
            for (let event of data) {
                for (let day of days) {
                    if (event.date_start === day) {
                        allevent[day] = [];
                        allevent[day][i] = event;
                    }
                    i++;
                }
            }
            console.log(allevent);
            this.events = data;
            // this.days = days;
        });*/
    }

    /*presentFilter() {
        let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
        modal.present();
        modal.onDidDismiss((data: any[]) => {
            if (data) {
                this.excludeTracks = data;
                this.updateSchedule();
            }
        });
    }*/

    goToSessionDetail(sessionData) {
        // go to the session detail page
        // and pass in the session data
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
    refresh(refresher) {
        this.updateSchedule();
        refresher.complete();
    };
}
