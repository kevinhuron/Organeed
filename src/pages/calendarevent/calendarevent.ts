import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, NavController } from 'ionic-angular';
// import { InAppBrowser } from 'ionic-native';
import * as $ from "jquery";

import { ConferenceData } from '../../providers/conference-data';


@Component({
    templateUrl: 'calendarevent.html'
})
export class CalendarEvent {
    actionSheet: ActionSheet;
    speakers = [];


    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, confData: ConferenceData) {
        confData.getSpeakers().then(speakers => {
            this.speakers = speakers;
        });
    }

    ionViewLoaded() {
        $('#calendar').fullCalendar({
            dayClick: function () {
                alert('a day has been clicked!');
            }
        });
    }

    /*goToSessionDetail(session) {
     this.navCtrl.push(EventDetailPage, session);
     }

     goToSpeakerDetail(speakerName: string) {
     this.navCtrl.push(SpeakerDetailPage, speakerName);
     }

     goToSpeakerTwitter(speaker) {
     let app = new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
     app.on('loadstop').subscribe(
     (ev) => {
     console.log('InAppBrowser loaded!');
     });
     }

     openSpeakerShare(speaker) {
     let actionSheet = this.actionSheetCtrl.create({
     title: 'Share ' + speaker.name,
     buttons: [
     {
     text: 'Copy Link',
     handler: () => {
     console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
     if (window['cordova'] && window['cordova'].plugins.clipboard) {
     window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
     }
     }
     },
     {
     text: 'Share via ...',
     handler: () => {
     console.log('Share via clicked');
     }
     },
     {
     text: 'Cancel',
     role: 'cancel',
     handler: () => {
     console.log('Cancel clicked');
     }
     }
     ]
     });

     actionSheet.present();
     }

     openContact(speaker) {
     let actionSheet = this.actionSheetCtrl.create({
     title: 'Contact with ' + speaker.name,
     buttons: [
     {
     text: `Email ( ${speaker.email} )`,
     icon: 'mail',
     handler: () => {
     window.open('mailto:' + speaker.email);
     }
     },
     {
     text: `Call ( ${speaker.phone} )`,
     icon: 'call',
     handler: () => {
     window.open('tel:' + speaker.phone);
     }
     }
     ]
     });

     actionSheet.present();
     }*/
}
